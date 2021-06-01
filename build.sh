rm -rf build
yarn build
mkdir build
find . \
  -type d \( -name node_modules -o -name .git \) -prune -false \
  -o \( -name "package.json" -o -name "build" -o -name "dist" -o -name "yarn.lock" \) \
  -a -not -path "./build*" \
  -exec cp -r --parents \{\} ./build \;
