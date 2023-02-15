truncate "lotes" cascade;

truncate "plantas" cascade;

truncate "actionPlants" cascade;

truncate "fasesCrop" cascade;

insert into
    public."fasesCrop" (
        created_at,
        id_user_create,
        "name",
        description,
        ordem
    )
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Iniciada',
        'Plantas recém transplantadas ou germinadas, identificadas.',
        1
    );

    insert into
    public."fasesCrop" (
        created_at,
        id_user_create,
        "name",
        description,
        ordem
    )
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Primeiro Beneficiamento',
        'Plantas recém transplantadas ou germinadas, identificadas.',
        2
    );
    insert into
    public."fasesCrop" (
        created_at,
        id_user_create,
        "name",
        description,
        ordem
    )
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Secagem',
        'Plantas recém transplantadas ou germinadas, identificadas.',
        3
    );

    insert into
    public."fasesCrop" (
        created_at,
        id_user_create,
        "name",
        description,
        ordem
    )
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Segundo Beneficiamento',
        'Plantas recém transplantadas ou germinadas, identificadas.',
        4
    );


    insert into
    public."fasesCrop" (
        created_at,
        id_user_create,
        "name",
        description,
        ordem
    )
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Finalizada',
        'Plantas recém transplantadas ou germinadas, identificadas.',
        5
    );



truncate "propagationType" cascade;

insert into
    public."propagationType" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Estaquia',
        'Plantas geradas pelo metodo de estaquia.'
    );

insert into
    public."propagationType" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Semente Feminilizada',
        'Plantas geradas por semente.'
    );

insert into
    public."propagationType" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Semente Regular',
        'Plantas geradas por semente.'
    );

truncate "profiles" cascade;

insert into
    public."profiles" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Desconhecido',
        'Plantas sem informações disponíveis.'
    );

insert into
    public."profiles" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Alto THC',
        'Plantas de alto THC.'
    );

insert into
    public."profiles" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Alto CBD',
        'Plantas de alto CBD.'
    );

insert into
    public."profiles" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Alto CBG',
        'Plantas de alto CBG.'
    );

insert into
    public."profiles" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Alto THCV',
        'Plantas de alto THCV.'
    );
insert into
    public."profiles" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Balanceadas THC:CBD',
        'Plantas com THC:CBD em proporções aproximadas.'
    );

truncate "recipientes" cascade;

insert into
    public."recipientes" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Desconhecido',
        'Plantas sem informações disponíveis.'
    );

insert into
    public."recipientes" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Vaso 1L',
        'Plantas de alto THC.'
    );

insert into
    public."recipientes" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Vaso 8L',
        'Plantas de alto CBD.'
    );

insert into
    public."recipientes" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Vaso 15L',
        'Plantas de alto CBD.'
    );

insert into
    public."recipientes" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Vaso 25L',
        'Plantas de alto CBD.'
    );

insert into
    public."recipientes" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Vaso 50L',
        'Plantas de alto CBD.'
    );

insert into
    public."recipientes" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Canteiro',
        'Plantas de alto CBD.'
    );

insert into
    public."recipientes" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Solo',
        'Plantas de alto CBD.'
    );

truncate "section" cascade;

insert into
    public."section" (id, created_at, id_user_create, "name", description)
values
    (
        1,
        CURRENT_TIMESTAMP,
        2,
        'Berçário',
        'Ambiente de propagação de plantas.'
    );

insert into
    public."section" (id, created_at, id_user_create, "name", description)
values
    (   
        2,
        CURRENT_TIMESTAMP,
        2,
        'Aclimatação',
        'Ambiente de propagação de plantas.'
    );

insert into
    public."section" (id, created_at, id_user_create, "name", description)
values
    (
        3,
        CURRENT_TIMESTAMP,
        2,
        'Vegetação',
        'Ambiente de vegetação de plantas.'
    );

--APEPI
-- insert into public."section" (created_at, id_user_create, "name", description) 
-- values (CURRENT_TIMESTAMP, 2, "Vegetação 1", "Ambiente de vegetação de plantas.");
-- insert into public."section" (created_at, id_user_create, "name", description) 
-- values (CURRENT_TIMESTAMP, 2, "Vegetação 2", "Ambiente de vegetação de plantas.");
-- insert into public."section" (created_at, id_user_create, "name", description) 
-- values (CURRENT_TIMESTAMP, 2, "Vegetação 3", "Ambiente de vegetação de plantas.");
-- insert into public."section" (created_at, id_user_create, "name", description) 
-- values (CURRENT_TIMESTAMP, 2, "Vegetação 4", "Ambiente de vegetação de plantas.");
insert into
    public."section" (id, created_at, id_user_create, "name", description)
values
    (
        4,
        CURRENT_TIMESTAMP,
        2,
        'Floração',
        'Ambiente de floração de plantas.'
    );

truncate "location" cascade;

--PROPAGAÇÃO
insert into
    public."location" (
        created_at,
        id_user_create,
        "name",
        description,
        id_section
    )
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Estufa de Propagação',
        'Ambiente de propagação de plantas.',
        1
    );

--PROPAGAÇÃO APEPI
-- insert into public."location" (created_at, id_user_create, "name", description, id_section) 
-- values (CURRENT_TIMESTAMP, 2, "Estufa de Propagação 1", "Ambiente de propagação de plantas.",1);
-- insert into public."location" (created_at, id_user_create, "name", description, id_section) 
-- values (CURRENT_TIMESTAMP, 2, "Estufa de Propagação 2", "Ambiente de propagação de plantas.",1);
-- insert into public."location" (created_at, id_user_create, "name", description, id_section) 
-- values (CURRENT_TIMESTAMP, 2, "Estufa de Propagação 3", "Ambiente de propagação de plantas.",1);
--ACLIMATAÇÃO
--ACLIMATAÇÃO APEPI
insert into
    public."location" (
        created_at,
        id_user_create,
        "name",
        description,
        id_section
    )
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Aclimatação',
        'Ambiente de aclimatação de plantas.',
        2
    );

--VEGETAÇÃO
--VEGETAÇÃO APEPI
insert into
    public."location" (
        created_at,
        id_user_create,
        "name",
        description,
        id_section
    )
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Área de Vegetação',
        'Ambiente de vegetação de plantas.',
        3
    );

--FLORAÇÃO
--FLORAÇÃO APEPI
insert into
    public."location" (
        created_at,
        id_user_create,
        "name",
        description,
        id_section
    )
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Área de Floração',
        'Ambiente de floração de plantas.',
        4
    );

truncate "trashReason" cascade;

insert into
    public."trashReason" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Fungo genérico',
        'Fungos genéricos.'
    );

insert into
    public."trashReason" (created_at, id_user_create, "name", description)
values
    (CURRENT_TIMESTAMP, 2, 'Chuva', 'Altera');

insert into
    public."trashReason" (created_at, id_user_create, "name", description)
values
    (CURRENT_TIMESTAMP, 2, 'Vento', 'Altera');

insert into
    public."trashReason" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Podridão de raiz',
        'Altera'
    );

insert into
    public."trashReason" (created_at, id_user_create, "name", description)
values
    (CURRENT_TIMESTAMP, 2, 'Pragas', 'Altera');

insert into
    public."trashReason" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Floração indevida',
        'Altera'
    );

insert into
    public."trashReason" (created_at, id_user_create, "name", description)
values
    (
        CURRENT_TIMESTAMP,
        2,
        'Falta de raízes',
        'Altera'
    );
-- actiontype
truncate "action_types" cascade;

truncate "actions" cascade;

INSERT INTO action_types (id, id_user_create,created_at,"name",code) VALUES
	 (1,2,now(),'Atividades de transplante.','TRANSPLANTE'),
	 (2,2,now(),'Alteração de fase de cultivo','ALTERA_FASE_CULTIVO'),
	 (3,2,now(),'Descartes Planta','DESCARTE_PLANTA'),
     (4,2,now(),'Descartes Muda ','DESCARTE_MUDA'),
	 (5,2,now(),'Alteração de local','ALTERA_LOCAL'),
     (6,2,now(),'Criação de Planta','CREATE_PLANTA'),
     (7,2,now(),'Criação de Muda','CREATE_MUDA'),
     (8,2,now(),'Matriz','MATRIZ'),
     (9,2,now(),'Colheita de Plantas','COLHEITA'),   
     (10,2,now(),'Finalização de Colheita','FINISH_CROP');


     
truncate tipo_fase_cultivo cascade;

INSERT INTO tipo_fase_cultivo ("name",created_at,id_user_create) VALUES
	 ('Propagação',now(),2),
	 ('Aclimatação',now(),2),
	 ('Vegetação',now(),2),
	 ('Floração',now(),2),
	 ('Colheita',now(),2);


truncate "fasesCultivo" cascade;

INSERT INTO "fasesCultivo" ("name",description,ordem,created_at,id_user_create, id_tipo_fase_cultivo) VALUES
	 ('Propagação','Plantas recém transplantadas ou germinadas, identificadas.',1,now(),2, 1),
	 ('Aclimatação','Plantas recém transplantadas ou germinadas, identificadas.',2,now(),2, 2),
	 ('Vegetação','Plantas recém transplantadas ou germinadas, identificadas.',3,now(),2, 3),
	 ('Floração','Plantas recém transplantadas ou germinadas, identificadas.',4,now(),2, 4),
	 ('Colheita','Plantas recém transplantadas ou germinadas, identificadas.',5,now(),2, 5);

