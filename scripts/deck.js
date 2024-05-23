
const { DeckGL, PathLayer, PolygonLayer, ColumnLayer } = deck;

// Process the bld data

function convertGeoJSONToPolygons(geojsonData) {
    const residential = [];
    const commercial = [];
    const mixed = [];
    const public = [];
    const industrial = [];

    geojsonData.features.forEach(feature => {
        const landUse = feature.properties["Land Use"];

        if (landUse === 'Residential') {
            const bounds = feature.geometry.coordinates[0][0];
            const height = feature.properties.Floors || 0.0; // Adjust as needed
            const land_use = feature.properties["Land Use"];
            const condition = feature.properties.Bld_cond
            const id = feature.properties.plot_id;
            const color = [255, 0, 128]; // You can customize the color here

            residential.push({ bounds, height, land_use, condition, id, color });

        } else if (landUse === 'Commercial') {
            const bounds = feature.geometry.coordinates[0][0];
            const height = feature.properties.Floors || 0.0; // Adjust as needed
            const land_use = feature.properties["Land Use"];
            const condition = feature.properties.Bld_cond
            const id = feature.properties.plot_id;
            const color = [255, 0, 128]; // You can customize the color here

            commercial.push({ bounds, height, land_use, condition, id, color });

        } else if (landUse === 'Public') {
            const bounds = feature.geometry.coordinates[0][0];
            const height = feature.properties.Floors || 0.0; // Adjust as needed
            const land_use = feature.properties["Land Use"];
            const condition = feature.properties.Bld_cond
            const id = feature.properties.plot_id;
            const color = [255, 0, 128]; // You can customize the color here

            public.push({ bounds, height, land_use, condition, id, color });
        } else if (landUse === 'Mixed') {
            const bounds = feature.geometry.coordinates[0][0];
            const height = feature.properties.Floors || 0.0; // Adjust as needed
            const land_use = feature.properties["Land Use"];
            const condition = feature.properties.Bld_cond
            const id = feature.properties.plot_id;
            const color = [255, 0, 128]; // You can customize the color here

            mixed.push({ bounds, height, land_use, condition, id, color });
        } else if (landUse === 'Industrial') {
            const bounds = feature.geometry.coordinates[0][0];
            const height = feature.properties.Floors || 0.0; // Adjust as needed
            const land_use = feature.properties["Land Use"];
            const condition = feature.properties.Bld_cond
            const id = feature.properties.plot_id;
            const color = [255, 0, 128]; // You can customize the color here

            industrial.push({ bounds, height, land_use, condition, id, color });
        }
        else {
            console.log("Problem")
            console.log(landUse)
            console.log(".........................")
        }

    });

    return [residential, commercial, mixed, public, industrial];
}

// Assuming you have loaded your GeoJSON data into a variable named 'geojsonData'
var returned_data = convertGeoJSONToPolygons(blds)
const residential_data = returned_data[0]
const commercial_data = returned_data[1]
const mixed_data = returned_data[2]
const public_data = returned_data[3]
const industrial_data = returned_data[4]

function toggle() {
    let residentialVisibility = document.getElementById('residentialLayerCheckbox').checked
    let commercialVisibility = document.getElementById('commercialLayerCheckbox').checked
    let mixedVisibility = document.getElementById('mixedLayerCheckbox').checked
    let publicVisibility = document.getElementById('publicLayerCheckbox').checked
    let industrialVisibility = document.getElementById('industrialLayerCheckbox').checked


    let layers = [new PolygonLayer({
        id: 'residential-layer',
        data: residential_data,
        extruded: true,
        stroked: true,
        filled: true,
        wireframe: false,
        lineWidthMinPixels: 0,
        getPolygon: d => d.bounds,
        getElevation: d => d.height,
        getFillColor: [123, 63, 0],
        getLineColor: [255, 0, 0],
        getLineWidth: d => 2,
        pickable: true,
        visible: residentialVisibility
    }),
    new PolygonLayer({
        id: 'commerical-layer',
        data: commercial_data,
        extruded: true,
        stroked: true,
        filled: true,
        wireframe: false,
        lineWidthMinPixels: 0,
        getPolygon: d => d.bounds,
        getElevation: d => d.height * 2,
        getFillColor: [210, 125, 45],
        getLineColor: [255, 0, 0],
        getLineWidth: d => 2,
        pickable: true,
        visible: commercialVisibility
    }),
    new PolygonLayer({
        id: 'mixed-layer',
        data: mixed_data,
        extruded: true,
        stroked: true,
        filled: true,
        wireframe: false,
        lineWidthMinPixels: 0,
        getPolygon: d => d.bounds,
        getElevation: d => d.height,
        getFillColor: [111, 78, 55],
        getLineColor: [255, 0, 0],
        getLineWidth: d => 2,
        pickable: true,
        visible: mixedVisibility
    }),

    new PolygonLayer({
        id: 'public-layer',
        data: public_data,
        extruded: true,
        stroked: true,
        filled: true,
        wireframe: false,
        lineWidthMinPixels: 0,
        getPolygon: d => d.bounds,
        getElevation: d => d.height,
        getFillColor: [92, 64, 51],
        getLineColor: [255, 0, 0],
        getLineWidth: d => 2,
        pickable: true,
        visible: publicVisibility
    }),

    new PolygonLayer({
        id: 'industrial-layer',
        data: industrial_data,
        extruded: true,
        stroked: true,
        filled: true,
        wireframe: false,
        lineWidthMinPixels: 0,
        getPolygon: d => d.bounds,
        getElevation: d => d.height,
        getFillColor: [139, 69, 19],
        getLineColor: [255, 0, 0],
        getLineWidth: d => 2,
        pickable: true,
        visible: industrialVisibility
    })



    ]

    deckcontainer.setProps({ layers });

}

const deckcontainer = new DeckGL({
    //mapStyle: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    mapStyle: 'https://tiles.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
    initialViewState: {
        longitude: 3.889101,
        latitude: 7.38016527,
        zoom: 15,
        maxZoom: 20,
        pitch: 90,
        bearing: 60
    },
    controller: true,
});

toggle();
