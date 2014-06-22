Name "New Chrome Session"
OutFile "NewChromeSession_Setup.exe"

RequestExecutionLevel admin

InstallDir "$PROGRAMFILES\New Chrome Session"
InstallDirRegKey HKEY_LOCAL_MACHINE "SOFTWARE\NewChromeSession" ""

ComponentText "Please choose which shortcuts you would like."

Section ""
	SetOutPath "$INSTDIR"
	File "new-chrome.js"
	
	SetShellVarContext all
	
	WriteRegStr HKEY_LOCAL_MACHINE "SOFTWARE\NewChromeSession" "" "$INSTDIR"
	WriteRegStr HKEY_LOCAL_MACHINE "Software\Microsoft\Windows\CurrentVersion\Uninstall\New Chrome Session" "DisplayName" "New Chrome Session (remove only)"
	WriteRegStr HKEY_LOCAL_MACHINE "Software\Microsoft\Windows\CurrentVersion\Uninstall\New Chrome Session" "UninstallString" '"$INSTDIR\uninst.exe"'
	WriteUninstaller "$INSTDIR\uninst.exe"
SectionEnd

Section "Start Menu Shortcut"
	SetShellVarContext all
	CreateShortCut "$SMPROGRAMS\New Chrome Session.lnk" "wscript.exe"  '"$INSTDIR\new-chrome.js"'
SectionEnd

Section "Desktop Shortcut"
	SetShellVarContext all
	CreateShortCut "$DESKTOP\New Chrome Session.lnk" "wscript.exe"  '"$INSTDIR\new-chrome.js"'
SectionEnd

; begin uninstall settings/section
UninstallText "This will uninstall New Chrome Session from your system."

Section Uninstall
	SetShellVarContext all
	Delete "$DESKTOP\New Chrome Session.lnk"
	Delete "$SMPROGRAMS\New Chrome Session.lnk"
	Delete "$INSTDIR\new-chrome.js"
	
	Delete "$INSTDIR\uninst.exe"
	DeleteRegKey HKEY_LOCAL_MACHINE "SOFTWARE\NewChromeSession"
	DeleteRegKey HKEY_LOCAL_MACHINE "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\New Chrome Session"
	RMDir "$INSTDIR"
SectionEnd