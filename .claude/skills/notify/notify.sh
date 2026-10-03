#!/usr/bin/env bash
# /notify — send an end-of-session summary on the channel configured in the kit's .env.
#
# This script is the only thing that reads .env. It prints the channel name and the
# result, never a value from .env. The summary arrives on stdin.
#
# .env keys:
#   NOTIFY_CHANNEL=desktop | email | webhook
#   NOTIFY_TITLE=<optional, default "Claude session">
#   desktop : nothing else (osascript on macOS, notify-send on Linux, a toast on Windows)
#   email   : NOTIFY_EMAIL_TO, NOTIFY_EMAIL_FROM, SMTP_HOST, SMTP_PORT (587), SMTP_USER, SMTP_PASS
#   webhook : NOTIFY_WEBHOOK_URL  (POST, JSON {"title": ..., "text": ...})
#
# Exit 0: sent, or nothing configured (no .env, no channel). Exit 1: a channel is set
# but incomplete, unknown, or the send failed. Errors never echo a value from .env.
# Email: port 587 with STARTTLS; port 465 (implicit TLS) is not supported yet.
set -euo pipefail

cd "$(dirname "$0")/../../.."

if [ ! -f .env ]; then
  echo "not configured: no .env at the kit root (keys listed at the top of this script)"
  exit 0
fi

# .env is read line by line, dotenv style (KEY=value, optional quotes, # comments),
# not sourced: a value with a space would otherwise run as a command.
while IFS= read -r line || [ -n "$line" ]; do
  line="${line%$'\r'}"
  case "$line" in ''|'#'*) continue ;; esac
  key="${line%%=*}"
  val="${line#*=}"
  key="${key#export }"
  key="$(printf '%s' "$key" | tr -d '[:space:]')"
  case "$key" in ''|[0-9]*|*[!A-Za-z0-9_]*) continue ;; esac
  case "$val" in
    \"*\") val="${val#\"}"; val="${val%\"}" ;;
    \'*\') val="${val#\'}"; val="${val%\'}" ;;
  esac
  export "$key=$val"
done < .env

summary="$(cat)"
if [ -z "$summary" ]; then
  echo "nothing to send: the summary is empty"
  exit 1
fi

title="${NOTIFY_TITLE:-Claude session}"

require() {
  for key in "$@"; do
    if [ -z "${!key:-}" ]; then
      echo "not configured: $key is missing in .env"
      exit 1
    fi
  done
}

json_escape() {
  # Escapes a string for use inside a JSON double-quoted value. No jq dependency.
  printf '%s' "$1" | tr -d '\r' | tr -d '\000-\010\013\014\016-\037' | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g' -e 's/\t/\\t/g' | awk 'BEGIN{ORS="\\n"} {print}' | sed -e 's/\\n$//'
}

case "${NOTIFY_CHANNEL:-}" in
  desktop)
    short="${summary:0:240}"
    case "$(uname -s)" in
      Darwin)
        esc="$(printf '%s' "$short" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g' | tr '\n' ' ')"
        tesc="$(printf '%s' "$title" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g')"
        osascript -e "display notification \"$esc\" with title \"$tesc\""
        ;;
      Linux)
        if ! command -v notify-send >/dev/null 2>&1; then
          echo "desktop: notify-send is not installed (package libnotify-bin on Debian/Ubuntu)"
          exit 1
        fi
        notify-send "$title" "$short"
        ;;
      MINGW*|MSYS*|CYGWIN*)
        pesc="$(printf '%s' "$short" | perl -CS -pe "s/[\x{2018}\x{2019}]/'/g" | sed "s/'/''/g" | tr '\n' ' ')"
        ptitle="$(printf '%s' "$title" | sed "s/'/''/g")"
        powershell.exe -NoProfile -Command \
          "Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; \$n = New-Object System.Windows.Forms.NotifyIcon; \$n.Icon = [System.Drawing.SystemIcons]::Information; \$n.Visible = \$true; \$n.ShowBalloonTip(10000, '$ptitle', '$pesc', [System.Windows.Forms.ToolTipIcon]::Info); Start-Sleep -Seconds 3"
        ;;
      *)
        echo "desktop: unsupported system $(uname -s)"
        exit 1
        ;;
    esac
    echo "sent: desktop notification"
    ;;

  email)
    require NOTIFY_EMAIL_TO NOTIFY_EMAIL_FROM SMTP_HOST SMTP_USER SMTP_PASS
    port="${SMTP_PORT:-587}"
    printf 'From: %s\nTo: %s\nSubject: %s\nContent-Type: text/plain; charset=UTF-8\n\n%s\n' \
      "$NOTIFY_EMAIL_FROM" "$NOTIFY_EMAIL_TO" "$title" "$summary" \
      | curl -fsS --ssl-reqd --url "smtp://$SMTP_HOST:$port" \
          --mail-from "$NOTIFY_EMAIL_FROM" --mail-rcpt "$NOTIFY_EMAIL_TO" \
          --user "$SMTP_USER:$SMTP_PASS" --upload-file - >/dev/null 2>&1 \
      || { echo "error: email send failed (curl exit $?); check SMTP_* in .env"; exit 1; }
    echo "sent: email"
    ;;

  webhook)
    require NOTIFY_WEBHOOK_URL
    body="{\"title\":\"$(json_escape "$title")\",\"text\":\"$(json_escape "$summary")\"}"
    curl -fsS -X POST -H 'Content-Type: application/json' --data "$body" "$NOTIFY_WEBHOOK_URL" >/dev/null 2>&1 \
      || { echo "error: webhook send failed (curl exit $?); check NOTIFY_WEBHOOK_URL in .env"; exit 1; }
    echo "sent: webhook"
    ;;

  "")
    echo "not configured: NOTIFY_CHANNEL is not set in .env (desktop | email | webhook)"
    exit 0
    ;;

  *)
    echo "not configured: unknown NOTIFY_CHANNEL (expected desktop | email | webhook)"
    exit 1
    ;;
esac
