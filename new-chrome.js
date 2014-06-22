/**
 * New Chrome Session
 * Copyright (c) 2014 AudioPump, Inc.
 * See LICENSE file for licensing information.
 */

var fso = WScript.CreateObject('Scripting.FileSystemObject');
var shell = new ActiveXObject('Wscript.Shell');

var DATA_DIR_PREFIX = 'new-chrome-session-';
var POPUP_OKONLY = 0x0;
var POPUP_STOPMARK = 0x10;
var FSO_SPECIAL_FOLDER_TEMP = 2;

function getChromePath() {
	var possibleRegKeys = [
		'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome\\InstallLocation',
		'HKCU\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome\\InstallLocation',
		'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome\\InstallLocation',
		'HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome\\InstallLocation'
	];
	
	for (var i=0; i<possibleRegKeys.length; i++) {
		try {
			return shell.RegRead(possibleRegKeys[i]) + '\\chrome.exe';
		} catch (e) {
			// Well, that didn't work... try the next key
		}
	}
	
	throw new Error('Google Chrome could not be found.');
}

// Create an empty directory for Chrome data
var tempPath = fso.GetSpecialFolder(FSO_SPECIAL_FOLDER_TEMP);
var chromeDataPath = tempPath + '\\' + DATA_DIR_PREFIX + (new Date()).valueOf();
fso.CreateFolder(chromeDataPath);

// Launch Chrome
try {
	shell.run('"' + getChromePath() + '" --user-data-dir="' + chromeDataPath + '"');
} catch (e) {
	shell.Popup(e.message, 0, 'Error Launching New Chrome Session', POPUP_OKONLY | POPUP_STOPMARK);
}

// Clean up old data directories
var tempFolder = fso.GetFolder(tempPath);
var tempFolderEnum = new Enumerator(tempFolder.SubFolders);
for (;!tempFolderEnum.atEnd(); tempFolderEnum.moveNext()) {
	var f = tempFolderEnum.item();
	if (
		f.Name.substr(0, DATA_DIR_PREFIX.length) === DATA_DIR_PREFIX &&
		!fso.FileExists(f.Path + '\\lockfile')
	) {
		fso.DeleteFolder(f.Path);
	}
}