import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import { Profile } from '@/lib/types';

interface MapProps {
  selectedProfile?: Profile;
}

const MapComponent = ({ selectedProfile }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const vectorSource = useRef<VectorSource | null>(null);
  const vectorLayer = useRef<VectorLayer<VectorSource> | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    console.log('Initializing map...');

    // Initialize vector source and layer for markers
    vectorSource.current = new VectorSource();
    vectorLayer.current = new VectorLayer({
      source: vectorSource.current,
    });

    // Create map
    map.current = new Map({
      target: mapContainer.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer.current,
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    console.log('Map initialized successfully');

    return () => {
      if (map.current) {
        map.current.setTarget(undefined);
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !selectedProfile || !vectorSource.current) return;

    console.log('Updating marker for profile:', selectedProfile);

    try {
      // Clear existing markers
      vectorSource.current.clear();

      // Create marker feature
      const markerFeature = new Feature({
        geometry: new Point(fromLonLat([
          selectedProfile.coordinates.lng,
          selectedProfile.coordinates.lat
        ])),
      });

      // Add marker style
      markerFeature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          }),
        })
      );

      // Add marker to source
      vectorSource.current.addFeature(markerFeature);

      // Pan to location
      map.current.getView().animate({
        center: fromLonLat([selectedProfile.coordinates.lng, selectedProfile.coordinates.lat]),
        zoom: 14,
        duration: 1000,
      });

      console.log('Marker updated successfully');
    } catch (error) {
      console.error('Error updating marker:', error);
    }
  }, [selectedProfile]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};

export default MapComponent;