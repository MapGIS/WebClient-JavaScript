import { EPSG, epsgId } from '../epsg/EPSG';

// import * as proj4 from "proj4";
// import proj4 from "proj4";

import * as proj4x from 'proj4';
const proj4 = proj4x.default;

export class ProjectTool {
    static getProj4sCascader() {
        const options = Object.keys(EPSG).map((key) => {
            const menu = {
                value: key,
                label: key,
                children: []
            };
            menu.children = EPSG[key].map((epsg) => {
                return { value: epsg.id, label: epsg.name };
            });
            return menu;
        });
        return options;
    }

    static getProj4sDetail(id) {
        let detail = '';
        const keys = Object.keys(EPSG);
        for (const key of keys) {
            const epsgs = EPSG[key];
            for (const item of epsgs) {
                if (item.id === id) {
                    detail = item.strProject;
                    break;
                }
            }
            if (detail !== '') {
                break;
            }
        }
        return detail;
    }

    static proj4TransformByEpsg(sourceid, destinationid, point) {
        let sId = epsgId(sourceid);
        let desId = epsgId(destinationid);
        
        let source = ProjectTool.getProj4sDetail(sId);
        let destination = ProjectTool.getProj4sDetail(desId);

        let proj = proj4(source, destination);
        let projpoint = proj.forward(point);
        
        return projpoint;
    }

    static proj4Transform(source, destination, point) {
        let proj = proj4(source, destination);
        let projpoint = proj.forward(point);
        return projpoint;
    }
}

export default ProjectTool;
