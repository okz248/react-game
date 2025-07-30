export const Action = (name: string, gender: string) => ({
    type: "RENAME",
    userdata: {
        name,
        gender
    } 
});

export type ActioType = ReturnType<typeof Action>;