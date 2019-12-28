import db from './db-connection';
import Guide from "../../interfaces/guide";
import PartGuide from "../../interfaces/part-guide";

export function selectGuides(): Promise<Guide[]> {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Guides`;
        db.all(sql, [], (err, rows: Guide[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export function selectGuideImageName(guideId: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const sql =
        `SELECT Guides.imageName
        FROM Guides
        WHERE Guides.id = ${guideId}`;
        db.all(sql, [], (err, rows: Guide) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0].imageName);
            }
        });
    });
}

export function selectPartGuides(guideId: number): Promise<PartGuide[]> {
    return new Promise((resolve, reject) => {
        const sql =
        `SELECT PartGuide.name, PartGuide.content
        FROM PartGuide
        WHERE PartGuide.guideId = ${guideId}
        ORDER BY PartGuide.sortKey ASC`;
        db.all(sql, [], (err, rows: PartGuide[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
