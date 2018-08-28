
before(async (): Promise<any> => {
    if (process.env.APP_ENV === 'production') {
        throw new Error("Envoirnment is set to production! Aborting!");
    }
    
    console.log('\n##############################'); 
    console.log('########## Tests #############');
    console.log('##############################\n');

});

after(async (): Promise<any> => {
    
});
