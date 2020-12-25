#!/usr/bin/env python3
# build release

import os
import zipfile

targetDir = "../src/"
distDir = "../dist"
name = "liesegangs_aescripts"
version = "1.0.0"
exclude = [".psd"]

def main():
  print("Version?")
  print(">", end="")
  version = input()

  with zipfile.ZipFile(f'{distDir}/{name}_{version}.zip', 'w', zipfile.ZIP_DEFLATED) as zipFile:
    for root, dirs, files in os.walk(targetDir):
      for file in files:
        print(os.path.splitext(file))
        if(os.path.splitext(file)[1] in exclude):
          continue
        zipFile.write(os.path.join(root, file),
          os.path.relpath(
            os.path.join(root, file),
            os.path.join(targetDir, '..')
          )
        )

if __name__ == "__main__":
  main()