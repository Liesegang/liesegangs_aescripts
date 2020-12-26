#!/usr/bin/env python3
# build release

import os
import sys
import re
import zipfile

targetDir = "Scripts"
distDir = "dist"
name = "liesegangs_aescripts"
exclude = [".psd"]

def main(argv):
  if(len(argv) < 2):
    return

  version = argv[1]
  if(not re.match('^v(\d+\.)?(\d+\.)?(\*|\d+)$', version)):
    return

  with zipfile.ZipFile(f'{distDir}/{name}_{version}.zip', 'w', zipfile.ZIP_DEFLATED) as zipFile:
    for root, dirs, files in os.walk(targetDir):
      for file in files:
        if(os.path.splitext(file)[1] in exclude):
          continue
        zipFile.write(os.path.join(root, file),
          os.path.relpath(
            os.path.join(root, file),
            os.path.join(targetDir, '..')
          )
        )

if __name__ == "__main__":
  main(sys.argv)