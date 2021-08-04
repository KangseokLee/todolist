module.exports = mongoose => {
    // Set model
    const Todolist = mongoose.model(
        'todolist',
        mongoose.Schema(
            { 
                content: String,
                completed: Boolean
            },
            { timestamps: true }
        )
    );
    
    return Todolist;
};