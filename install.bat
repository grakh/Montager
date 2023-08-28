@Reg Add "HKCU\Software\Adobe\CSXS.7" /VE /F
@Reg Add "HKCU\Software\Adobe\CSXS.7" /V "PlayerDebugMode" /D "1" /F >Nul
@Reg Add "HKCU\Software\Adobe\CSXS.7" /V "LogLevel" /D "1" /F >Nul

@Reg Add "HKCU\Software\Adobe\CSXS.8" /VE /F
@Reg Add "HKCU\Software\Adobe\CSXS.8" /V "PlayerDebugMode" /D "1" /F >Nul
@Reg Add "HKCU\Software\Adobe\CSXS.8" /V "LogLevel" /D "1" /F >Nul

@Reg Add "HKCU\Software\Adobe\CSXS.9" /VE /F
@Reg Add "HKCU\Software\Adobe\CSXS.9" /V "PlayerDebugMode" /D "1" /F >Nul
@Reg Add "HKCU\Software\Adobe\CSXS.9" /V "LogLevel" /D "1" /F >Nul

@Reg Add "HKCU\Software\Adobe\CSXS.10" /VE /F
@Reg Add "HKCU\Software\Adobe\CSXS.10" /V "PlayerDebugMode" /D "1" /F >Nul
@Reg Add "HKCU\Software\Adobe\CSXS.10" /V "LogLevel" /D "1" /F >Nul

@Reg Add "HKCU\Software\Adobe\CSXS.11" /VE /F
@Reg Add "HKCU\Software\Adobe\CSXS.11" /V "PlayerDebugMode" /D "1" /F >Nul
@Reg Add "HKCU\Software\Adobe\CSXS.11" /V "LogLevel" /D "1" /F >Nul

@Reg Add "HKCR\infolder" /VE /F
@Reg Add "HKCR\infolder" /V "URL Protocol" /D "URL:Infolder Protocol" /F >Nul
@Reg Add "HKCR\infolder\shell" /VE /F 
@Reg Add "HKCR\infolder\shell\open" /VE /F 
@Reg Add "HKCR\infolder\shell\open\command" /VE /D "\"%~dp0infolder.bat\" \"%%1\"" /F >Nul

copy MagistralC.ttf C:\Windows\Fonts