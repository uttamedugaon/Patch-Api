const express = require("express");
const app = express();

app.use(express.json());

// Q1 + Q10: Orders Data
let orders = [
    { id: 101, item: "Laptop", amount: 50000 },
    { id: 102, item: "Mobile", amount: 15000 },
    { id: 103, item: "Tablet", amount: 25000 }
];

// Q2 + Q11: Users Data
let users = [
    { id: 1, name: "Raman", email: "raman@gmail.com" },
    { id: 2, name: "Ajay", email: "ajay@gmail.com" },
    { id: 3, name: "Ramanjay", email: "ramanjay@gmail.com" }
];

// Q3: Products Data
let products = [
    { id: 11, name: "Mouse", price: 800 },
    { id: 12, name: "Keyboard", price: 1200 }
];

// Q4: Students Data
let students = [
    { roll: 101, name: "Ajay", marks: 88 },
    { roll: 102, name: "Raman", marks: 76 }
];

// Q5: Employees Data
let employees = [
    { id: 1, name: "Raman", dept: "HR" },
    { id: 2, name: "Ajay", dept: "IT" }
];

// Q6: Books Data
let books = [
    { id: 201, title: "Swift Basics", author: "Apple" },
    { id: 202, title: "Node.js Mastery", author: "Ryan Dahl" }
];

// Q7: Movies Data
let movies = [
    { id: 1, name: "Inception", rating: 9 },
    { id: 2, name: "Interstellar", rating: 8 }
];

// Q8: Courses Data
let courses = [
    { id: 101, course: "Web Development", duration: "3 Months" },
    { id: 102, course: "App Development", duration: "4 Months" }
];

// Q9: Cities Data
let cities = [
    { id: 1, name: "Delhi", population: "2 Cr" },
    { id: 2, name: "Mumbai", population: "1.8 Cr" }
];


// Q1 + Q10: PATCH /orders/:id
// Partially update order OR update only amount
app.patch("/orders/:id", (req, res) => {
    const id = Number(req.params.id);

    const order = orders.find((order) => order.id === id);

    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    const { item, amount } = req.body;

    if (item === undefined && amount === undefined) {
        return res.status(400).json({
            message: "Send item or amount to update"
        });
    }

    if (item !== undefined) {
        if (typeof item !== "string" || !item.trim()) {
            return res.status(400).json({
                message: "item must be a non-empty string"
            });
        }

        order.item = item;
    }

    if (amount !== undefined) {
        if (typeof amount !== "number") {
            return res.status(400).json({
                message: "amount must be a number"
            });
        }

        order.amount = amount;
    }

    res.json({
        message: "Order partially updated",
        order
    });
});


// Q2 + Q11: PATCH /users/:id OR /users/:name
// Numeric identifier = ID; text identifier = name
app.patch("/users/:identifier", (req, res) => {
    const identifier = req.params.identifier;

    let user;

    if (/^\d+$/.test(identifier)) {
        const id = Number(identifier);
        user = users.find((user) => user.id === id);
    } else {
        const name = identifier.toLowerCase();
        user = users.find(
            (user) => user.name.toLowerCase() === name
        );
    }

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const email = req.body.email;

    if (typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
            message: "email is required"
        });
    }

    user.email = email;

    res.json({
        message: "User email updated",
        user
    });
});


// Q3: PATCH /products/:id
// Update only product price
app.patch("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        (product) => product.id === id
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (
        req.body.price === undefined ||
        typeof req.body.price !== "number"
    ) {
        return res.status(400).json({
            message: "price must be a number"
        });
    }

    product.price = req.body.price;

    res.json({
        message: "Product price updated",
        product
    });
});


// Q4: PATCH /students/:roll
// Update only student marks
app.patch("/students/:roll", (req, res) => {
    const roll = Number(req.params.roll);

    const student = students.find(
        (student) => student.roll === roll
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    if (
        req.body.marks === undefined ||
        typeof req.body.marks !== "number"
    ) {
        return res.status(400).json({
            message: "marks must be a number"
        });
    }

    student.marks = req.body.marks;

    res.json({
        message: "Student marks updated",
        student
    });
});


// Q5: PATCH /employees/:id
// Update only department
app.patch("/employees/:id", (req, res) => {
    const id = Number(req.params.id);

    const employee = employees.find(
        (employee) => employee.id === id
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    const dept = req.body.dept;

    if (typeof dept !== "string" || !dept.trim()) {
        return res.status(400).json({
            message: "dept is required"
        });
    }

    employee.dept = dept;

    res.json({
        message: "Employee department updated",
        employee
    });
});


// Q6: PATCH /books/:id
// Update only author name
app.patch("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(
        (book) => book.id === id
    );

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const author = req.body.author;

    if (typeof author !== "string" || !author.trim()) {
        return res.status(400).json({
            message: "author is required"
        });
    }

    book.author = author;

    res.json({
        message: "Book author updated",
        book
    });
});


// Q7: PATCH /movies/:id
// Update movie rating
app.patch("/movies/:id", (req, res) => {
    const id = Number(req.params.id);

    const movie = movies.find(
        (movie) => movie.id === id
    );

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        });
    }

    if (
        req.body.rating === undefined ||
        typeof req.body.rating !== "number"
    ) {
        return res.status(400).json({
            message: "rating must be a number"
        });
    }

    movie.rating = req.body.rating;

    res.json({
        message: "Movie rating updated",
        movie
    });
});


// Q8: PATCH /courses/:id
// Update only course duration
app.patch("/courses/:id", (req, res) => {
    const id = Number(req.params.id);

    const course = courses.find(
        (course) => course.id === id
    );

    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    const duration = req.body.duration;

    if (
        typeof duration !== "string" ||
        !duration.trim()
    ) {
        return res.status(400).json({
            message: "duration is required"
        });
    }

    course.duration = duration;

    res.json({
        message: "Course duration updated",
        course
    });
});


// Q9: PATCH /cities/:id
// Update only population
app.patch("/cities/:id", (req, res) => {
    const id = Number(req.params.id);

    const city = cities.find(
        (city) => city.id === id
    );

    if (!city) {
        return res.status(404).json({
            message: "City not found"
        });
    }

    const population = req.body.population;

    if (
        typeof population !== "string" ||
        !population.trim()
    ) {
        return res.status(400).json({
            message: "population is required"
        });
    }

    city.population = population;

    res.json({
        message: "City population updated",
        city
    });
});


// Start Server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});