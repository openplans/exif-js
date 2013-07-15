exif-js
========

This is a library that supports client side EXIF parsing inside the browser.
Images are taken from the DOM and the gathered EXIF information can be used to update the page.

The original library that does the EXIF parsing was done by @jseidelin .
The additional script in this repository can be integrated in any website where it will process all images
and add a hover overlay with the most relevant EXIF data. Images without EXIF information are automatically ignored.

The default is to display only some basic information like

```
1/125 at f/11 with ISO 250 (FUJIFILM X100S at 23mm)
```
The script can easily be altered to generate different EXIF output.


Example
-------
Download the source code and open the _index.html_ file inside the example folder to get an impression of what the overlay looks like.

Usage in Wordpress
------------------
The integration in Wordpress is straightforward. Just place the four files on your webspace and add them to the _header.php_
```html
<script type="text/javascript" src="exif/binaryajax.js"></script>
<script type="text/javascript" src="exif/exif.js"></script>
<script type="text/javascript" src="exif/replaceImages.js"></script>

<link rel='stylesheet' href='exif/style.css' type='text/css' media='all' />
```
