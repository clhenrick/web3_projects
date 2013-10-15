#! usr/bin/env python
 
from sys import argv
from os.path import exists
import simplejson as json 
import random
 
script, in_file, out_file = argv
 
data = json.load(open(in_file))


geojson = {
    "type": "FeatureCollection",
    "features": [
    {
        "type": "Feature",
        "geometry" : {
            "type": "Point",
            ## scramble the data using random!
            "coordinates": [d["lon"], d["lat"]],
            },
        "properties" : d,
     } for d in data]
}

def scrambleGeo(input):
    """
    attempting to scramble the lat and lon values...
    """

    random1 = (1 - random.uniform(.001, .01))
    random2 = (1 + random.uniform(.001, .01))

    for feature in input['features']: 
        lon = feature['geometry']['coordinates'][0]
        lat = feature['geometry']['coordinates'][1]

        print "lon original: ", lon, " lat original: ", lat
        
        scramble1 = lon * random1
        scramble2 = lat * random2
        
        ## write the new lat lon values to the input
        feature['geometry']['coordinates'][0] = scramble1
        feature['geometry']['coordinates'][1] = scramble2

        print "lon scrambled: ", scramble1, " lat scrambled: ", scramble2
        print
    
    print input ## double check input is returning something
    return input ## return the input!



output = open(out_file, 'w')

json.dump(scrambleGeo(geojson), output) 

