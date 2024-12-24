// Middleware to validate request body for POST and PUT
export const validateUserInput = (req, res, next) => {
    const { firstName, lastName, hobby, age } = req.body;

    // Check if firstName, lastName, and hobby are present
    if (!firstName || !lastName || !hobby || !age) {
        return res.status(400).json({
            message: "All fields (firstName, lastName, hobby, age) are required",
        });
    }

    // Validate firstName (should be a non-empty string)
    if (typeof firstName !== 'string' || firstName.trim().length === 0) {
        return res.status(400).json({
            message: "firstName should be a non-empty string",
        });
    }

    // Validate lastName (should be a non-empty string)
    if (typeof lastName !== 'string' || lastName.trim().length === 0) {
        return res.status(400).json({
            message: "lastName should be a non-empty string",
        });
    }

    // Validate hobby (should be an array with at least one element)
    if (!Array.isArray(hobby) || hobby.length === 0) {
        return res.status(400).json({
            message: "hobby should be a non-empty array",
        });
    }

    // Validate age (should be a number and greater than 0)
    if (age !== undefined) {
        if (typeof age !== 'number' || age <= 0) {
            return res.status(400).json({
                message: "age should be a positive number",
            });
        }
    }

    next(); // Pass control to the next middleware or route handler
};
