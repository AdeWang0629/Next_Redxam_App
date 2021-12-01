#!/usr/bin/env bash

# UFW Port Firewall Setup
# Enables ports 80 & 3006
sudo apt install ufw
sudo ufw default allow incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 3006
sudo ufw enable