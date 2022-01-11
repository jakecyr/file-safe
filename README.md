# File Safe

A simple CLI to encrypt and decrypt files.

## Installation

`npm install -g file-safe`

`file-safe [command]`

OR

`npx file-safe [command]`

## Usage 

```text
Options:
  -h, --help                        display help for command

Commands:
  encrypt [options] [fileOrFolder]
  decrypt [options] [fileOrFolder]
  help [command]  
```

## Encrypt

Pass in the path to a file or directory. If a directory is passed in, all files in the directory will be encrypted with the provided key and **the source files will be deleted**.

```text
encrypt [options] [fileOrFolder]

Options:
  -k, --key <key>     The key to use for encryption
  -s, --keep-source   Keep the source file
  -f, --force         Blow through any red tape
  -m, --maintain-ext  Maintain the file extension of the source file
  -e, --ext <exts>    Encrypt all files with the specified ext
  -h, --help          display help for command
```

## Decrypt

Pass in the path to a file or directory. If a directory is passed in, all files in the directory will be decrypted with the provided key and **the source files will be deleted**.

```text
decrypt [options] [fileOrFolder]

Options:
  -k, --key <key>    The key to use for encryption
  -s, --keep-source  Keep the source file
  -f, --force        Blow through any red tape
  -h, --help         display help for command
```