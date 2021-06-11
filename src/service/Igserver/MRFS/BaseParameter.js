// import { Parser } from "node-sql-parser";

import {Zondy} from "../../common";

class BaseParameter {
  static formatParam(param) {
    let arr = [
      "IncludeAttribute",
      "IncludeGeometry",
      "IncludeWebGraphic",
      "isAsc",
      "compareRectOnly",
      "enableDisplayCondition"
    ];
    for (let i = 0; i < arr.length; i++) {
      if (typeof param[arr[i]] === "string") {
        param[arr[i]] = param[arr[i]] === "true";
      }
    }
    return param;
  }
  constructor() {
    this.layers = [];
    this.pageIndex = 0;
    this.pagination = 100;
    this.resultFormat = "json";
    this.IncludeAttribute = true;
    this.IncludeGeometry = true;
    this.IncludeWebGraphic = false;
    this.orderBy = undefined;
    this.isAsc = undefined;
    this.proj = undefined;
    this.fields = undefined;
    this.coordPrecision = undefined;
    this.cursorType = "backward";
  }
}

BaseParameter.prototype.formatParameter = function(layerKey, crs) {
  let Obj,
    me = this;
  me._crs = crs;
  if (layerKey === "typename") {
    Obj = {
      layers: layerKey,
      pagination: "maxfeatures",
      rectangle: "bbox",
      where: "filter",
      geometry: "filter",
      objectIds: "featureId"
    };
    if (this.where && this.geometry) {
      delete Obj.geometry;
    }
    Object.keys(Obj).forEach(function(key) {
      if (me.hasOwnProperty(key) && me[key]) {
        if (me[key] instanceof Array) {
          Obj[Obj[key]] = me[key].join(",");
        } else {
          if (key === "where" || key === "geometry") {
            Obj[Obj[key]] = initFilter(me[key], me.geometry, me);
          } else {
            Obj[Obj[key]] = me[key];
          }
        }
      }
      delete Obj[key];
    });
    return Obj;
  } else {
    Obj = {
      layers: layerKey,
      pageIndex: "Page",
      pagination: "pageCount",
      resultFormat: "f",
      includeAttribute: "IncludeAttribute",
      includeGeometry: "IncludeGeometry",
      includeWebGraphic: "IncludeWebGraphic",
      orderBy: "orderField"
    };
    Object.keys(Obj).forEach(function(key) {
      if (me.hasOwnProperty(key)) {
        me[Obj[key]] = me[key];
        delete me[key];
      }
    });
    return this;
  }
};

// function geometryToXmlGeoserver(geometry, me) {
//   let xml = "<" + me.spatialRelationType + ">";
//   xml += "<PropertyName>the_geom</PropertyName>";
//   xml += "<gml:" + geometry.type + " srsName='" + me._crs + "'>";
//   xml +=
//     "<gml:pos>" +
//     geometry.coordinates[0] +
//     " " +
//     geometry.coordinates[1] +
//     "</gml:pos>";
//   xml += "</gml:" + geometry.type + ">";
//   xml += "</" + me.spatialRelationType + ">";
//   return xml;
// }
//
// function geometryToXml(geometry, me) {
//   let xml = "";
//   xml += "<" + me.spatialRelationType + ">";
//   xml += "<" + geometry.type + " srsName='" + me._crs + "'>";
//   if (geometry.type === "Polygon") {
//     xml += "<outerBoundaryIs><LinearRing>";
//     xml += "<coordinates>";
//     for (let i = 0; i < geometry.coordinates.length; i++) {
//       xml += geometry.coordinates[i].join(",") + " ";
//     }
//     xml = xml.substr(0, xml.length - 1);
//     xml += "</coordinates>";
//     xml += "</LinearRing></outerBoundaryIs>";
//   } else if (geometry.type === "MultiPoint") {
//     xml += "<pointMember>";
//     for (let i = 0; i < geometry.coordinates.length; i++) {
//       xml +=
//         "<Point><coordinates>" +
//         geometry.coordinates[i].join(",") +
//         "</coordinates></Point>";
//     }
//     xml += "</pointMember>";
//   } else if (geometry.type === "Point") {
//     xml += "<coordinates>" + geometry.coordinates.join(",") + "</coordinates>";
//   } else {
//     xml += "<coordinates>";
//     for (let i = 0; i < geometry.coordinates.length; i++) {
//       xml += geometry.coordinates[i].join(",") + " ";
//     }
//     xml = xml.substr(0, xml.length - 2);
//     xml += "</coordinates>";
//   }
//   xml += "</" + geometry.type + ">";
//   xml += "</" + me.spatialRelationType + ">";
//   return xml;
// }
// function initFilter(where, geometry, me) {
//   if (where.length > 0) {
//     //sql转ast插件
//     let parse = new Parser(),
//       //ast树对象
//       astObject,
//       //返回的filter
//       filter = "<Filter>",
//       //比较操作符枚举
//       comparisonOperators = {
//         "=": "PropertyIsEqualTo",
//         "!=": "PropertyIsNotEqualTo",
//         "<": "PropertyIsLessThan",
//         ">": "PropertyIsGreaterThan",
//         "<=": "PropertyIsLessThanOrEq",
//         ">=": "PropertyIsGreaterThanO",
//         LIKE: "PropertyIsLike",
//         BETWEEN: "PropertyIsBetween"
//       },
//       //逻辑操作符枚举
//       logicOperators = {
//         OR: "Or",
//         AND: "And",
//         NOT: "Not"
//       };
//     //拼接sql
//     where = "Select * from t where " + where;
//     //转换为ast树
//     astObject = parse.astify(where);
//     //讲逻辑操作符转换为xml
//     function formatLogicOperator(xml, ast, operator, geometry, me) {
//       xml += "<" + logicOperators[operator] + ">";
//       if (operator === "NOT") {
//         xml += astToXml(ast.expr);
//       } else {
//         xml += astToXml(ast.left);
//         xml += astToXml(ast.right);
//       }
//       if (geometry) {
//         xml += geometryToXml(geometry, me);
//       }
//       xml += "</" + logicOperators[operator] + ">";
//       return xml;
//     }
//     //将ast转换为xml
//     function astToXml(ast) {
//       let xml = "";
//       if (ast.operator === "OR") {
//         xml += formatLogicOperator(xml, ast, "OR", geometry, me);
//       } else if (ast.operator === "AND") {
//         xml += formatLogicOperator(xml, ast, "AND", geometry, me);
//       } else if (ast.operator === "NOT") {
//         xml += formatLogicOperator(xml, ast, "NOT", geometry, me);
//       } else {
//         if (comparisonOperators.hasOwnProperty(ast.operator)) {
//           xml += "<" + comparisonOperators[ast.operator] + ">";
//           xml += "<PropertyName>" + ast.left.column + "</PropertyName>";
//           if (ast.operator === "BETWEEN") {
//             xml +=
//               "<LowerBoundary><Literal>" +
//               ast.right.value[0].value +
//               "</Literal></LowerBoundary>";
//             xml +=
//               "<UpperBoundary><Literal>" +
//               ast.right.value[1].value +
//               "</Literal></UpperBoundary>";
//           } else {
//             if (ast.right.type === "column_ref") {
//               xml += "<Literal>" + ast.right.column + "</Literal>";
//             } else {
//               xml += "<Literal>" + ast.right.value + "</Literal>";
//             }
//           }
//           xml += "</" + comparisonOperators[ast.operator] + ">";
//           if (geometry) {
//             xml += geometryToXml(geometry, me);
//           }
//         } else {
//           throw new Error("非法的SQL关键字" + ast.operator + "！");
//         }
//       }
//       return xml;
//     }
//     filter += astToXml(astObject.where);
//     filter += "</Filter>";
//     return filter;
//   } else {
//     let filter = "<Filter>";
//     filter += geometryToXml(geometry, me);
//     filter += "</Filter>";
//     return filter;
//   }
// }
export { BaseParameter };
Zondy.Service.BaseParameter = BaseParameter;
