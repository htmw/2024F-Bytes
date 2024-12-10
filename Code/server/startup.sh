#!/bin/bash

# Install Python 3 and pip3 if not already installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 not found, installing..."
    sudo apt-get update
    sudo apt-get install -y python3 python3-pip python3-dev python3-distutils
fi

# Install pip for Python 3 (if not already installed)
if ! command -v pip3 &> /dev/null; then
    echo "pip3 for Python 3 not found, installing..."
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    python3 get-pip.py --user
fi

# Ensure pip3 is in the PATH
export PATH=$PATH:/www-data-home/.local/bin

echo "Starting Python dependencies installation..."

# Function to install a package and check for errors
install_package() {
    package=$1
    echo "Installing $package..."
    if pip3 install --no-cache-dir "$package"; then
        echo "$package installed successfully."
    else
        echo "Failed to install $package. Check the error above." >&2
        exit 1  # Exit the script on failure
    fi
}

# List of packages to install
packages=(
    "audioread"
    "huggingface-hub"
    "importlib_metadata"
    "librosa==0.10.2.post1"
    "openai-whisper"
    "safetensors"
    "scikit-learn"
    "scipy"
    "sentencepiece"
    "soundfile"
    "tiktoken"
    "tokenizers"
    "transformers"
)

# Iterate over the package list and install each
for package in "${packages[@]}"; do
    install_package "$package"
done

# Confirm Python packages are installed
echo "Installed Python packages:"
pip3 freeze || echo "Failed to list installed packages. Check if pip3 is configured correctly." >&2

echo "Python dependencies installation completed."

# Install Node.js dependencies (if package.json exists)
if [ -f "package.json" ]; then
    echo "Installing Node.js dependencies..."
    npm install
else
    echo "No package.json found. Skipping Node.js dependencies installation."
fi

# Start the Node.js app
echo "Starting Node.js app..."
exec node app.js
    