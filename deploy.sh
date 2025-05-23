#!/usr/bin/env sh

# 忽略错误
set -e  #有错误抛出错误

# 检查并删除 dist 目录
if [ -d "dist" ]; then
  echo "dist目录存在,自动帮您删除了- dist文件"
  rm -rf dist
fi

# 构建
pnpm run build:test  

#进到dist目录
cd dist  

git init  
git add -A
git commit -m 'deploy'
# 重命名分支 -M 重命名分支 -u 起一个别名
git branch -M main-pages
# 强制推送到main-pages分支
git push -f https://github.com/huozaifenlangli/Vue3-template.git main-pages

# 退回开始所在目录
cd - 

#删除dist文件夹
rm -rf dist 