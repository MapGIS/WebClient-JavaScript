import turfbbox from '@turf/bbox';

/* type GeoJSONPosition = [number, number] | [number, number, number];
type Geometry<T, C> = { type: T, coordinates: C };

export type GeoJSONPoint = Geometry<'Point', GeoJSONPosition>;
export type GeoJSONMultiPoint = Geometry<'MultiPoint', Array<GeoJSONPosition>>;

export type GeoJSONLineString = Geometry<'LineString', Array<GeoJSONPosition>>;
export type GeoJSONMultiLineString = Geometry<'MultiLineString', Array<Array<GeoJSONPosition>>>;

export type GeoJSONPolygon = Geometry<'Polygon', Array<Array<GeoJSONPosition>>>;
export type GeoJSONMultiPolygon = Geometry<'MultiPolygon', Array<Array<Array<GeoJSONPosition>>>>;

export type GeoJSONGeometry =
    | GeoJSONPoint
    | GeoJSONMultiPoint
    | GeoJSONLineString
    | GeoJSONMultiLineString
    | GeoJSONPolygon
    | GeoJSONMultiPolygon
    | GeoJSONGeometryCollection;

export type GeoJSONGeometryCollection = {
    type: 'GeometryCollection',
    geometries: Array<GeoJSONGeometry>
};

export type GeoJSONFeature = {
    type: 'Feature',
    geometry?: GeoJSONGeometry,
    properties?: {},
    id?: number | string
};

export type GeoJSONFeatureCollection = {
    type: 'FeatureCollection',
    features: Array<GeoJSONFeature>
};

export type GeoJSON = GeoJSONGeometry | GeoJSONFeature | GeoJSONFeatureCollection;

export let EmptyGeoJSONFeatureCollection: GeoJSONFeatureCollection = {
    type: 'FeatureCollection',
    features: []
}; */

export class GeojsonFeature {
    constructor() {
        // constructor
        this.feature = undefined;
        this.bounds = undefined;
    }

    createFeature(feature) {
        this.feature = feature;
    }

    createGeomtry(geometry) {
        this.feature = {
            geometry
        };
    }

    createProperties(properties) {
        this.feature = {
            properties
        };
    }

    getFeature() {
        return this.feature;
    }

    getBounds(maprender) {
        this.bbox();
        const { bounds } = this;
        return [
            [bounds[0], bounds[1]],
            [bounds[2], bounds[3]]
        ];
    }

    bbox() {
        this.bounds = turfbbox(this.feature);
        return this.bounds;
    }
}

export class GeojsonCollection {
    constructor(features) {
        this.bounds = undefined;
        this.data = {
            type: 'FeatureCollection',
            features: []
        };

        if (features instanceof Array) {
            this.data.features = features || [];
        } else {
            this.data.features = [features];
        }
    }

    addFeature(feature) {
        if (feature instanceof GeojsonFeature) {
            this.data.features.push(feature.getFeature());
        } else {
            this.data.features.push(feature);
        }
    }

    setFeatures(features) {
        this.data.features = features;
    }

    getData() {
        return this.data;
    }

    getBounds() {
        this.bbox();
        const { bounds } = this;
        return bounds;
    }

    bbox() {
        this.bounds = turfbbox(this.data);
        return this.bounds;
    }
}
