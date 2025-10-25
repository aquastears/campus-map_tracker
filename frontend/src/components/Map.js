import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Create custom icons for different routes
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });
};

const orangeIcon = createCustomIcon('#FF6B35');
const blueIcon = createCustomIcon('#004E98');
const dualIcon = createCustomIcon('#7B2CBF'); // Purple for stops serving both routes

function Map() {
  const [accessibilityPoints, setAccessibilityPoints] = useState([]);
  const [busStops, setBusStops] = useState([]);

  // Default center - Syracuse University
  const campusCenter = [43.0481, -76.1474];

  useEffect(() => {
    setBusStops([
      // Orange Loop stops
      {
        id: 1,
        name: 'Irving Garage (Stadium Pl.)',
        latitude: 43.03695130587595,
        longitude: -76.13881204517028,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["6:40", "7:20", "8:00", "8:40", "9:20", "10:00", "10:40", "11:20", "12:00", "12:40", "1:20", "2:00", "2:40", "3:20", "4:00", "4:40", "5:20", "6:00", "6:40", "7:20", "8:00", "8:40"],
          'Blue Loop': ["7:00", "7:40", "8:20", "9:00", "9:40", "10:20", "11:00", "11:40", "12:20", "1:00", "1:40", "2:20", "3:00", "3:40", "4:20", "5:00", "5:40", "6:20", "7:00", "7:40", "8:20", "9:00"]
        }
      },
      {
        id: 2,
        name: 'Quad Lot',
        latitude: 43.036904734072465,
        longitude: -76.13049777735792,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["6:45", "7:25", "8:05", "8:45", "9:25", "10:05", "10:45", "11:25", "12:05", "12:45", "1:25", "2:05", "2:45", "3:25", "4:05", "4:45", "5:25", "6:05", "6:45", "7:25", "8:05", "8:45"],
          'Blue Loop': ["7:33", "8:13", "8:53", "9:33", "10:13", "10:53", "11:33", "12:13", "12:53", "1:33", "2:13", "2:53", "3:33", "4:13", "4:53", "5:33", "6:13", "6:53", "7:33", "8:13", "8:53", "9:33"]
        }
      },
      {
        id: 3,
        name: 'National Veterans Resource Center (NVRC)',
        latitude: 43.04101262113025,
        longitude: -76.13632399314636,
        accessible: true,
        routes: ['Orange Loop'],
        schedules: {
          'Orange Loop': ["6:48", "7:28", "8:08", "8:48", "9:28", "10:08", "10:48", "11:28", "12:08", "12:48", "1:28", "2:08", "2:48", "3:28", "4:08", "4:48", "5:28", "6:08", "6:48", "7:28", "8:08", "8:48"]
        }
      },
      {
        id: 4,
        name: 'University Ave. North Lot',
        latitude: 43.0434472045928,
        longitude: -76.1338417247402,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["6:51", "7:31", "8:11", "8:51", "9:31", "10:11", "10:51", "11:31", "12:11", "12:51", "1:31", "2:11", "2:51", "3:31", "4:11", "4:51", "5:31", "6:11", "6:51", "7:31", "8:11", "8:51"],
          'Blue Loop': ["7:27", "8:07", "8:47", "9:27", "10:07", "10:47", "11:27", "12:07", "12:47", "1:27", "2:07", "2:47", "3:27", "4:07", "4:47", "5:27", "6:07", "6:47", "7:27", "8:07", "8:47", "9:27"]
        }
      },
      {
        id: 5,
        name: 'Schine Student Center',
        latitude: 43.04043791173709,
        longitude: -76.13379993985262,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["6:53", "7:33", "8:13", "8:53", "9:33", "10:13", "10:53", "11:33", "12:13", "12:53", "1:33", "2:13", "2:53", "3:33", "4:13", "4:53", "5:33", "6:13", "6:53", "7:33", "8:13", "8:53"],
          'Blue Loop': ["7:10", "7:50", "8:30", "9:10", "9:50", "10:30", "11:10", "11:50", "12:30", "1:10", "1:50", "2:30", "3:10", "3:50", "4:30", "5:10", "5:50", "6:30", "7:10", "7:50", "8:30", "9:10"]
        }
      },
      {
        id: 6,
        name: 'Comstock Ave. Garage',
        latitude: 43.04060326781048,
        longitude: -76.13016429979565,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["6:55", "7:35", "8:15", "8:55", "9:35", "10:15", "10:55", "11:35", "12:15", "12:55", "1:35", "2:15", "2:55", "3:35", "4:15", "4:55", "5:35", "6:15", "6:55", "7:35", "8:15", "8:55"],
          'Blue Loop': ["7:22", "8:02", "8:42", "9:22", "10:02", "10:42", "11:22", "12:02", "12:42", "1:22", "2:02", "2:42", "3:22", "4:02", "4:42", "5:22", "6:02", "6:42", "7:22", "8:02", "8:42", "9:22"]
        }
      },
      {
        id: 7,
        name: 'Dellplain (University Pl.)',
        latitude: 43.03938994790544,
        longitude: -76.1298930852021,
        accessible: true,
        routes: ['Orange Loop'],
        schedules: {
          'Orange Loop': ["6:57", "7:37", "8:17", "8:57", "9:37", "10:17", "10:57", "11:37", "12:17", "12:57", "1:37", "2:17", "2:57", "3:37", "4:17", "4:57", "5:37", "6:17", "6:57", "7:37", "8:17", "8:57"]
        }
      },
      {
        id: 8,
        name: 'College Place Bus Shelter',
        latitude: 43.03720581321301,
        longitude: -76.13150015469904,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["6:59", "7:39", "8:19", "8:59", "9:39", "10:19", "10:59", "11:39", "12:19", "12:59", "1:39", "2:19", "2:59", "3:39", "4:19", "4:59", "5:39", "6:19", "6:59", "7:39", "8:19", "8:59"],
          'Blue Loop': ["7:20", "8:00", "8:40", "9:20", "10:00", "10:40", "11:20", "12:00", "12:40", "1:20", "2:00", "2:40", "3:20", "4:00", "4:40", "5:20", "6:00", "6:40", "7:20", "8:00", "8:40", "9:20"]
        }
      },
      {
        id: 9,
        name: 'Flint Hall',
        latitude: 43.03509050267058,
        longitude: -76.1326957934114,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["7:03", "7:43", "8:23", "9:03", "9:43", "10:23", "11:03", "11:43", "12:23", "1:03", "1:43", "2:23", "3:03", "3:43", "4:23", "5:03", "5:43", "6:23", "7:03", "7:43", "8:23", "9:03"],
          'Blue Loop': ["7:15", "7:55", "8:35", "9:15", "9:55", "10:35", "11:15", "11:55", "12:35", "1:15", "1:55", "2:35", "3:15", "3:55", "4:35", "5:15", "5:55", "6:35", "7:15", "7:55", "8:35", "9:15"]
        }
      },
      {
        id: 10,
        name: 'Shaw Hall (Euclid Ave.)',
        latitude: 43.036314809108895,
        longitude: -76.12964006555826,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["7:05", "7:45", "8:25", "9:05", "9:45", "10:25", "11:05", "11:45", "12:25", "1:05", "1:45", "2:25", "3:05", "3:45", "4:25", "5:05", "5:45", "6:25", "7:05", "7:45", "8:25", "9:05"],
          'Blue Loop': ["7:17", "7:57", "8:37", "9:17", "9:57", "10:37", "11:17", "11:57", "12:37", "1:17", "1:57", "2:37", "3:17", "3:57", "4:37", "5:17", "5:57", "6:37", "7:17", "7:57", "8:37", "9:17"]
        }
      },
      {
        id: 11,
        name: 'Barnes Center at the Arch',
        latitude: 43.036373594291206,
        longitude: -76.13438906859045,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["7:07", "7:47", "8:27", "9:07", "9:47", "10:27", "11:07", "11:47", "12:27", "1:07", "1:47", "2:27", "3:07", "3:47", "4:27", "5:07", "5:47", "6:27", "7:07", "7:47", "8:27", "9:07"],
          'Blue Loop': ["7:05", "7:45", "8:25", "9:05", "9:45", "10:25", "11:05", "11:45", "12:25", "1:05", "1:45", "2:25", "3:05", "3:45", "4:25", "5:05", "5:45", "6:25", "7:05", "7:45", "8:25", "9:05"]
        }
      },
      {
        id: 12,
        name: 'Forestry Gate',
        latitude: 43.03549900056266,
        longitude: -76.13447896600961,
        accessible: true,
        routes: ['Orange Loop'],
        schedules: {
          'Orange Loop': ["7:10", "7:50", "8:30", "9:10", "9:50", "10:30", "11:10", "11:50", "12:30", "1:10", "1:50", "2:30", "3:10", "3:50", "4:30", "5:10", "5:50", "6:30", "7:10", "7:50", "8:30", "9:10"]
        }
      },
      {
        id: 13,
        name: 'BBB on Van Buren',
        latitude: 43.038163004727835,
        longitude: -76.14148371601667,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["7:12", "7:52", "8:32", "9:12", "9:52", "10:32", "11:12", "11:52", "12:32", "1:12", "1:52", "2:32", "3:12", "3:52", "4:32", "5:12", "5:52", "6:32", "7:12", "7:52", "8:32", "9:12"],
          'Blue Loop': ["7:34", "8:14", "8:54", "9:34", "10:14", "10:54", "11:34", "12:14", "12:54", "1:34", "2:14", "2:54", "3:34", "4:14", "4:54", "5:34", "6:14", "6:54", "7:34", "8:14", "8:54", "9:34"]
        }
      },
      {
        id: 14,
        name: 'Campus West',
        latitude: 43.037406719101725,
        longitude: -76.14070522972762,
        accessible: true,
        routes: ['Orange Loop', 'Blue Loop'],
        schedules: {
          'Orange Loop': ["7:13", "7:53", "8:33", "9:13", "9:53", "10:33", "11:13", "11:53", "12:33", "1:13", "1:53", "2:33", "3:13", "3:53", "4:33", "5:13", "5:53", "6:33", "7:13", "7:53", "8:33", "9:13"],
          'Blue Loop': ["7:35", "8:15", "8:55", "9:35", "10:15", "10:55", "11:35", "12:15", "12:55", "1:35", "2:15", "2:55", "3:35", "4:15", "4:55", "5:35", "6:15", "6:55", "7:35", "8:15", "8:55", "9:35"]
        }
      },
      {
        id: 15,
        name: 'Henry St. Lot',
        latitude: 43.03648004471739,
        longitude: -76.14106969607624,
        accessible: true,
        routes: ['Orange Loop'],
        schedules: {
          'Orange Loop': ["7:14", "7:54", "8:34", "9:14", "9:54", "10:34", "11:14", "11:54", "12:34", "1:14", "1:54", "2:34", "3:14", "3:54", "4:34", "5:14", "5:54", "6:34", "7:14", "7:54", "8:34", "9:14"]
        }
      },
      {
        id: 16,
        name: 'Lawrinson Garage',
        latitude: 43.035074379826575,
        longitude: -76.13901815299812,
        accessible: true,
        routes: ['Orange Loop'],
        schedules: {
          'Orange Loop': ["7:15", "7:55", "8:35", "9:15", "9:55", "10:35", "11:15", "11:55", "12:35", "1:15", "1:55", "2:35", "3:15", "3:55", "4:35", "5:15", "5:55", "6:35", "7:15", "7:55", "8:35", "9:15"]
        }
      },
      
      // Blue Loop exclusive stops
      {
        id: 17,
        name: 'Sadler Hall',
        latitude: 43.03445912844178,
        longitude: -76.13945486472936,
        accessible: true,
        routes: ['Blue Loop'],
        schedules: {
          'Blue Loop': ["7:01", "7:41", "8:21", "9:01", "9:41", "10:21", "11:01", "11:41", "12:21", "1:01", "1:41", "2:21", "3:01", "3:41", "4:21", "5:01", "5:41", "6:21", "7:01", "7:41", "8:21", "9:01"]
        }
      },
      {
        id: 18,
        name: 'Life Sciences / College Place',
        latitude: 43.038144741478376,
        longitude: -76.13147376603175,
        accessible: true,
        routes: ['Blue Loop'],
        schedules: {
          'Blue Loop': ["7:20", "8:00", "8:40", "9:20", "10:00", "10:40", "11:20", "12:00", "12:40", "1:20", "2:00", "2:40", "3:20", "4:00", "4:40", "5:20", "6:00", "6:40", "7:20", "8:00", "8:40", "9:20"]
        }
      },
      {
        id: 19,
        name: 'Waverly Ave. at Comstock Ave.',
        latitude: 43.040603241468666,
        longitude: -76.13016946633692,
        accessible: true,
        routes: ['Blue Loop'],
        schedules: {
          'Blue Loop': ["7:24", "8:04", "8:44", "9:24", "10:04", "10:44", "11:24", "12:04", "12:44", "1:24", "2:04", "2:44", "3:24", "4:04", "4:44", "5:24", "6:04", "6:44", "7:24", "8:04", "8:44", "9:24"]
        }
      },
      {
        id: 20,
        name: 'Walnut Ave. at Harrison St.',
        latitude: 43.044193844954975,
        longitude: -76.13216981940101,
        accessible: true,
        routes: ['Blue Loop'],
        schedules: {
          'Blue Loop': ["7:25", "8:05", "8:45", "9:25", "10:05", "10:45", "11:25", "12:05", "12:45", "1:25", "2:05", "2:45", "3:25", "4:05", "4:45", "5:25", "6:05", "6:45", "7:25", "8:05", "8:45", "9:25"]
        }
      }
    ]);
  }, []);

  // Function to get the appropriate icon based on routes
  const getStopIcon = (routes) => {
    if (routes.length === 2) return dualIcon;
    if (routes.includes('Orange Loop')) return orangeIcon;
    if (routes.includes('Blue Loop')) return blueIcon;
    return null;
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer 
        center={campusCenter} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Bus Stops */}
      {busStops.map(stop => (
        <Marker 
          key={`bus-${stop.id}`} 
          position={[stop.latitude, stop.longitude]}
          icon={getStopIcon(stop.routes)}
        >
          <Popup>
            <div style={{ minWidth: '320px', maxHeight: '450px', overflowY: 'auto' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{stop.name}</h3>
              <div style={{ marginBottom: '8px' }}>
                {stop.routes.map((route, idx) => (
                  <span 
                    key={idx}
                    style={{ 
                      display: 'inline-block',
                      padding: '2px 8px',
                      marginRight: '5px',
                      backgroundColor: route === 'Orange Loop' ? '#FF6B35' : '#004E98',
                      color: 'white',
                      borderRadius: '3px',
                      fontSize: '0.85em',
                      fontWeight: 'bold'
                    }}
                  >
                    {route}
                  </span>
                ))}
              </div>
              <em>Accessible: {stop.accessible ? '✓ Yes' : '✗ No'}</em>
              
              {/* Display schedules for each route */}
              {Object.entries(stop.schedules).map(([routeName, times]) => (
                <div key={routeName} style={{ marginTop: '12px' }}>
                  <strong style={{ 
                    color: routeName === 'Orange Loop' ? '#FF6B35' : '#004E98' 
                  }}>
                    {routeName} Schedule:
                  </strong>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '4px',
                    marginTop: '5px'
                  }}>
                    {times.map((time, index) => (
                      <div key={index} style={{ 
                        padding: '3px 5px',
                        backgroundColor: '#f8f9fa',
                        border: `1px solid ${routeName === 'Orange Loop' ? '#FF6B35' : '#004E98'}`,
                        borderRadius: '3px',
                        textAlign: 'center',
                        fontSize: '0.85em'
                      }}>
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
      {/* Legend overlay */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        background: 'white',
        padding: '8px 10px',
        borderRadius: 6,
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        zIndex: 1000,
        fontSize: '0.9em'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ width: 12, height: 12, background: '#7B2CBF', borderRadius: 3, marginRight: 8 }} />
          <span>Purple = combined stops</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ width: 12, height: 12, background: '#FF6B35', borderRadius: 3, marginRight: 8 }} />
          <span>Orange = Orange Loop only</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 12, height: 12, background: '#004E98', borderRadius: 3, marginRight: 8 }} />
          <span>Blue = Blue Loop only</span>
        </div>
      </div>
    </div>
  );
}

export default Map;