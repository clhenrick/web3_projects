Scramble Your Mobile Data beta!
===============================
##A fictional prototype for an app that scrambles the lat lon data from your mobile device being sent to the NSA.

---
Currently testing this idea by using the [openpaths.cc](https://openpaths.cc/) API to retrieve mobile location data in json format. Data is retrieved, converted to a GeoJSON format and scrambled using python scripts. Data is then visualized using the Leaflet API.

###To Do:
* debug leaflet js to create pop-ups for the GeoJSON markers.

* Create an animation effect in Leaflet where orginial data points transition to scrambled data points or vice versa.

* add more GUI elements.
  eg: how scrambled data could be used by facebook / twitter / flickr,
      lets the user "unlock" their real data to see where they actually have been by entering a keycode.

* look into OpenSignals App.
