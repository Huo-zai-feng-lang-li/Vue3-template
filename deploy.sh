#!/usr/bin/env sh

# 忽略错误
set -e  #有错误抛出错误

# 检查并删除 dist 目录
if [ -d "dist" ]; then
  echo "dist目录存在,自动帮您删除了- dist文件"
  rm -rf dist
fi

# 构建
pnpm run build:test  #然后执行打包命令

# 进入待发布的目录
cd dist  #进到dist目录

git init  #执行这些git命令
git add -A
git commit -m 'deploy'
# 重命名分支 -M 重命名分支 -u 起一个别名
git branch -M main-pages
# 在main分支提交到main-pages分支上
git push -f https://github.com/huozaifenlangli/Vue3-template.git main-pages

cd - # 退回开始所在目录

rm -rf dist  #删除dist文件夹