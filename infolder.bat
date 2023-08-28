@echo off
set "path=%~1"
setlocal enabledelayedexpansion
set path=%path:infolder://=%
set path=%path:"=%
set path=%path:/=\%
set path=!path:%%20= !
set path=!path:%%5C=\!

C:\Windows\explorer.exe "%path%"