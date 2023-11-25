#!/usr/bin/env bash

# Run this script with the --remove flag to remove these hosts from your configuration instead.

ENTRIES=("127.0.0.1	api.kaktus.money" "127.0.0.1	kaktus.money" "127.0.0.1	portal.kaktus.money")

HOSTS_FILE=""

case "$(uname -s)" in
    Linux*)     HOSTS_FILE="/etc/hosts";;
    CYGWIN*|MINGW32*|MSYS*|MINGW*) HOSTS_FILE="/c/Windows/System32/drivers/etc/hosts";;
    *)          HOSTS_FILE="UNKNOWN:${unameOut}"
esac

add_entry_if_not_exists() {
    local entry=$1
    if ! grep -qF -- "${entry}" "$HOSTS_FILE"; then
        echo "Adding ${entry} to your hosts file"
        echo "${entry}" >> "$HOSTS_FILE"
    else
        echo "Entry ${entry} already exists in your hosts file"
    fi
}

remove_entry_if_exists() {
    local entry=$1
    if grep -qF -- "${entry}" "$HOSTS_FILE"; then
        echo "Removing ${entry} from your hosts file"
        sed -i "/${entry}/d" "$HOSTS_FILE"
    else
        echo "Entry ${entry} does not exist in your hosts file"
    fi
}

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root or with administrator privileges" 
   exit 1
fi

for entry in "${ENTRIES[@]}"; do
    if [[ "$1" == "--remove" ]]; then
        remove_entry_if_exists "${entry}"
    else
        add_entry_if_not_exists "${entry}"
    fi
done

echo "Host file update complete!"
