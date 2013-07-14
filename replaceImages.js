var replaceImage=function(im) {
        EXIF.getData(im, function() {
            var make = EXIF.getTag(im, "Make"),
            model = EXIF.getTag(im, "Model");
            aperture = parseFloat(EXIF.getTag(im, "FNumber"));
            exposure = parseFloat(EXIF.getTag(im, "ExposureTime"));
            iso = parseFloat(EXIF.getTag(im, "ISOSpeedRatings"));
            focalLength = parseFloat(EXIF.getTag(im, "FocalLength"));
            var text = "";
            var fields = 0;

            if(!isNaN(exposure)) {
                if(exposure < 1)
                    text = text + "1/" + 1.0/exposure;
                else
                    text = text + exposure;
                fields++;
            }

            if(!isNaN(aperture)) {
                text = text + " at f/" + aperture;
                fields++;
            }
            
            if(!isNaN(iso)) {
                text = text + " with ISO " + iso;
                fields++;
            }
            if(make != null && model != null) {
                /* Make sure make is not displayed twice */
                if(model.indexOf(make) == 0)
                    text = text + " (" + model;
                else
                    text = text + " (" + make + " " + model;
                fields+=2;
            }

            if(!isNaN(focalLength)) {
                text = text + " at " + focalLength + "mm";
                fields++;
            }

            text += ")";

            /* Only display if there is information */
            if(fields > 3) {
                //im.title = text;

                var outer = document.createElement('div');
                outer.setAttribute("class", "exifouter");

                im.parentNode.parentNode.appendChild(outer);

                var inner = document.createElement('div');
                inner.setAttribute("class", "exif");
                inner.innerHTML = text;

                outer.appendChild(im.parentNode);
                outer.appendChild(inner);

            }
        });
    }
    
    var replaceImages=function() {
        /*for (i = 0; i < document.images.length; ++i) {
            document.images[i].onload = function() {
                replaceImage(document.images[i]);
            };
        }*/
        allcomplete = true;
        for (i = 0; i < document.images.length; ++i) {
            if (document.images[i].complete == false) {
                allcomplete = false;
                break;
            }
        }

        if(allcomplete == true) {
            for (i = 0; i < document.images.length; ++i) {
                replaceImage(document.images[i]);
            }
        } else {
            setTimeout(function(){replaceImages();},100);
        }
    }

    window.onload=replaceImages;

