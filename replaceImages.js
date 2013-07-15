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
                text = text + "1/" + Math.round(1.0/exposure);
            else
                text = text + Math.round(exposure);
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
    allcomplete = true;
    for (i = 0; i < document.images.length; ++i) {
        /* If not all images are loaded we are not done */
        if (document.images[i].complete == false) {
            allcomplete = false;
        /* Only process images that were not already processed */
        } else if(document.images[i].getAttribute("processed") == null) {
            replaceImage(document.images[i]);
            document.images[i].setAttribute("processed", true);
        }
    }

    /* If there are images left try again after 200ms */
    if(allcomplete == false) {
        setTimeout(function(){replaceImages();},200);
    }
}

window.onload=replaceImages;

