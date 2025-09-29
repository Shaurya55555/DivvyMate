-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,             -- Auto-incrementing ID for each user
    name VARCHAR(100) NOT NULL,        -- User's full name
    email VARCHAR(100) UNIQUE NOT NULL,-- User's email address (unique)
    phone VARCHAR(15),                 -- User's phone number
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for when the user was created
);

-- Create Expenses Table
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,             -- Auto-incrementing ID for each expense
    user_id INT REFERENCES users(id),  -- ID of the user who created the expense
    description TEXT NOT NULL,         -- Description of the expense
    amount DECIMAL(10, 2) NOT NULL,    -- Amount of the expense
    split_method VARCHAR(20) NOT NULL, -- Method of splitting (equal, exact, percentage)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for when the expense was created
);

-- Create Expense Splits Table (Tracks how expenses are split among users)
CREATE TABLE expense_splits (
    id SERIAL PRIMARY KEY,             -- Auto-incrementing ID for each split record
    expense_id INT REFERENCES expenses(id), -- Expense ID the split belongs to
    user_id INT REFERENCES users(id),  -- User ID who shares the expense
    split_amount DECIMAL(10, 2) NOT NULL, -- Amount that this user owes for the expense
    percentage DECIMAL(5, 2),          -- Percentage for percentage-based splits (NULL if not applicable)
    exact_amount DECIMAL(10, 2),       -- Exact amount for exact split method (NULL if not applicable)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for when the split was created
);

-- Create Balance Sheets Table (Stores cumulative balances for users)
CREATE TABLE balance_sheets (
    id SERIAL PRIMARY KEY,             -- Auto-incrementing ID for each balance sheet
    user_id INT REFERENCES users(id),  -- ID of the user this balance sheet belongs to
    total_amount DECIMAL(10, 2) NOT NULL, -- Total amount owed or to be collected by the user
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for when the balance sheet was generated
);
