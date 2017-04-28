# Chrome Multiple Sessions Support

Chrome Multiple Sessions (formerly the New Chrome Session browser extension) launches Google Chrome with a completely clean 
history, settings, bookmarks, etc.  This is useful for testing websites with a clear cache.  It can also be used for 
logging into websites with several accounts simultaneously, as the different instances of Chrome do not share cookie 
data.

This script is for Windows only.  However, it is not complicated at all.  You are welcome to translate it for another
system if you would like.

## Installation

Run the installer to create shortcuts on your desktop and start menu.  If you would like, you can right click on one 
of these shortcuts and then click "Pin to Taskbar" to add a taskbar icon.

If you do not want, or are unable to use the installer, you may simply copy the `new-chrome.js` file to a convenient 
location.  By default, Windows will run this script when it is double-clicked.  If you have associated `*.js` files with
 another application, you can run `new-chrome.js` with `wscript.exe`:

    wscript "path\to\new-chrome.js"
    
## How it Works
Google Chrome has a `--user-data-dir` option to set the path for which it should store all data.  New Chrome Session 
is a very small script that creates a new temporary directory and launches Google Chrome using this new empty directory 
for Chrome data.  The script also cleans up old temporary directors no longer in use when ran.

## Build your own installer
You can use [NSIS](http://nsis.sourceforge.net/Main_Page) to compile the installer.nsi file.

## License
Read the LICENSE file.

## Feedback
Please e-mail feedback to [brad@audiopump.co](mailto:brad@audiopump.co).

Cloned from : https://bitbucket.org/bradisbell/new-chrome-session