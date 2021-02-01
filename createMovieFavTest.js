const db = require("./models");

// (async () => {
//     let insertResult = await db.favorites.create({
//         userid: 1,
//         movieid: 1,
//     });
//     insertResult = await db.favorites.create({
//         userid: 1,
//         movieid: 2,
//     });
//     insertResult = await db.favorites.create({
//         userid: 1,
//         movieid: 3,
//     });
//     insertResult = await db.favorites.create({
//         userid: 1,
//         movieid: 4,
//     });
//     insertResult = await db.favorites.create({
//         userid: 1,
//         movieid: 5,
//     });

//     let records = await db.favorites.findAll();
//     console.log(records);
// })();

// (async () => {
//     let records = await db.favorites.findAll({
//         where: { userid: 1 },
//         include: [
//             {
//                 model: db.movies,
//             },
//         ],
//         raw: true,
//     });
//     console.log(records);
// })();

(async () => {
    let records = await db.favorites.findAll({
        where: { userid: 1 },
        include: [
            {
                model: db.movies,
            },
        ],
        raw: true,
    });
    console.log(records);
})();
