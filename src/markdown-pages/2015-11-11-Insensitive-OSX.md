---
title: Insensitive OS X
---

On my Mac running Yosemite(10.10.2) I tried:

```bash
$ mkdir a
$ mkdir A
mkdir: A: File exists
```

Coming from a case sensitive *nix world, this was strange. Why does Apple need a case insensitive file system?

Who knows, but here’s [A Linus Rant](http://www.itworld.com/article/2868393/linus-torvalds-apples-hfs-is-probably-the-worst-file-system-ever.html) on it.

HFS+ (the Mac filesystem) is usually configured to be case insensitive but case preserving.
Case insensitive means that this works:

```bash
 $ ls -ld a
drwxr-xr-x  2 ddigges  ddigges 68 Nov 11 18:04 a
 $ ls -ld A
drwxr-xr-x  2 ddigges  ddigges 68 Nov 11 18:04 A
```

However, when you create a new file it will remember which letters were capitalized and which were not.

```bash
$ mkdir aBc
$ ls -ld aBc
drwxr-xr-x  2 ddigges  ddigges  68 Nov 11 18:27 aBc
```

HFS is a bit of an oddity, having the ability to ignore and recognize case at the same time. 

To know whether your Mac filesystem is case sensitive or not, use the `diskutil` comand:

```bash
$ diskutil info /
   File System Personality:  Journaled HFS+
   Type (Bundle):            hfs
   Name (User Visible):      Mac OS Extended (Journaled)
```

Look for the `File System Personality` and `Name` fields in the output. If the file system is case sensitive, you will see *Case-sensitive Journaled HFS* in the File System Personality and *Mac OS Extended (Case-sensitive, Journaled)* in the name.

Say you need to copy files from a *nix system, or do something else that requires a case sensitive file system, you can create a case sensitive disk image on your Mac as follows:

```bash
$ hdiutil create -type SPARSE -fs 'Case-sensitive Journaled HFS+' -size 60g -volname workspace $WHERE_TO_STORE_THE_IMAGE

$ hdiutil attach $WHERE_TO_STORE_THE_IMAGE

$ cd /Volumes/workspace

/Volumes/workspace $ mkdir a
/Volumes/workspace $ mkdir A
/Volumes/workspace $ ls
A	a
```
 
Linus would be proud.
