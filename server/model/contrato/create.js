function create(matricula, ano, semestre, pathContrato){

    let query = `
    
            BEGIN TRAN
                INSERT INTO 
                    NODE_contratoContrato 
                VALUES
                (
                  '${ matricula }'
                , ${ ano }
                , ${ semestre }
                , '${ pathContrato }'
                , GETDATE()
                )
                IF @@ERROR = 0
                    BEGIN
                        COMMI TRAN
                        SELECT @@IDENTITY AS idContrato
                    END
                ELSE
                    BEGIN
                        ROLLBACK TRAN
                        SELECT -1 AS idContrato
                    END
    
    `

    return query;

}

module.exports = create;