const express = require('express');
const cors = require('cors');
const appPool = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
    // res.redirect('http://localhost:5173/');
});


app.post('/addincome', (req, res) => {
    const nominal = req.body.nominal;
    const tujuan = req.body.tujuan;
    const tipe = req.body.tipe;
    const getDate = new Date();
    const tanggal = getDate.toISOString().slice(0, 10);
    const INSERT_INCOMES = `INSERT INTO incomes (nominal, tujuan, tanggal, tipe) VALUES ('${nominal}', '${tujuan}', '${tanggal}', '${tipe}');`;

    appPool
        .query(INSERT_INCOMES)
        .then((response) => {
            console.log("Table 'incomes' inserted successfully");
            res.send({
                status: 200,
                body: response.rows
            });
        })
        .catch((err) => {
            console.log("Failed to inserted table 'incomes'");
            console.log(err);
        })

});

app.get('/get-all-incomes', (req, res) => {
    const SELECT_ALL_OUTCOME = `
    SELECT 
        *
    FROM incomes 
`;

    appPool
        .query(SELECT_ALL_OUTCOME)
        .then((response) => {
            console.log("Table 'incomes' selected successfully");
            res.send({
                status: 200,
                body: response.rows,
            });
        })
        .catch((err) => {
            console.log("Failed to selected table 'incomes'");
            console.log(err);
            res.send({
                status: 404,
                message: "Failed to selected table 'incomes'"
            });
        });

});

app.get('/get-all-outcome', (req, res) => {
    const SELECT_ALL_OUTCOME = `
    SELECT 
        *
    FROM incomes 
    WHERE tipe = 'out';
`;

    appPool
        .query(SELECT_ALL_OUTCOME)
        .then((response) => {
            console.log("Table 'incomes' selected successfully");
            res.send({
                status: 200,
                body: response.rows,

            });
        })
        .catch((err) => {
            console.log("Failed to selected table 'incomes'");
            console.log(err);
            res.send({
                status: 404,
                message: "Failed to selected table 'incomes'"
            });
        });

});

app.get('/get-sum-income', (req, res) => {
    const COUNT_INCOME = `SELECT SUM(nominal) AS total_income, (SELECT SUM(nominal) FROM incomes) AS total_nominal FROM incomes WHERE tipe = 'in';`;

    appPool
        .query(COUNT_INCOME)
        .then((response) => {
            console.log("Table 'incomes' selected successfully");
            res.send({
                status: 200,
                body: response.rows,
            });
        })
        .catch((err) => {
            console.log("Failed to selected table 'incomes'");
            console.log(err);
            res.send({
                status: 404,
                message: "Failed to selected table 'incomes'"
            });
        });


});

app.get('/get-sum-outcome', (req, res) => {
    const COUNT_OUTCOME = `SELECT SUM(nominal) AS total_outcome, (SELECT SUM(nominal) FROM incomes) AS total_nominal FROM incomes WHERE tipe = 'out';`;

    appPool
        .query(COUNT_OUTCOME)
        .then((response) => {
            console.log("Table 'incomes' selected successfully");
            res.send({
                status: 200,
                body: response.rows,
            });
        })
        .catch((err) => {
            console.log("Failed to selected table 'incomes'");
            console.log(err);
            res.send({
                status: 404,
                message: "Failed to selected table 'incomes'"
            });
        });

});

app.get('/get-all-income', (req, res) => {
    const SELECT_ALL_INCOME = `
    SELECT 
        *
    FROM incomes 
    WHERE tipe = 'in';
`;

    appPool
        .query(SELECT_ALL_INCOME)
        .then((response) => {
            console.log("Table 'incomes' selected successfully");
            res.send({
                status: 200,
                body: response.rows,

            });
        })
        .catch((err) => {
            console.log("Failed to selected table 'incomes'");
            console.log(err);
            res.send({
                status: 404,
                message: "Failed to selected table 'incomes'"
            });
        });
});


app.post('/update-income-nominal/:id', (req, res) => {
    const id = req.params.id;
    const newNominal = req.body.nominal;
    const UPDATE_INCOMES_BY_ID = `UPDATE incomes SET nominal = $1 WHERE id = $2;`;


    appPool
        .query(UPDATE_INCOMES_BY_ID, [newNominal, id])
        .then((response) => {
            res.send({
                status: 200,
                message: "Seccessfull update Table 'incomes'"
            });
        })
        .catch((err) => {
            res.send({
                status: 200,
                err: err,
                message: "Failed update Table 'incomes'"
            });
        });
});


app.post('/delete-incomes-by-id/:id', (req, res) => {
    const id = req.params.id;
    const DELETE_INCOMES_BY_ID = `DELETE FROM incomes WHERE id = $1`;

    appPool
        .query(DELETE_INCOMES_BY_ID, [id])
        .then((response) => {
            res.send({
                status: 200,
                message: "Income deleted successfully"
            });
        })
        .catch((err) => {
            let response = {
                status: 401,
                message: `Failed to delete income with ID ${id}`
            };

            if (err !== undefined) {
                response.err = err;
            }

            res.send(response);
        })

});

app.listen(4000, () => console.log('Server BE Running.....'));