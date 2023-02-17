insert into company values (1, 'Minha Empresa', 'empresa@org.com');

insert into permissions values (1, 'user.list', 'Listar Usuário');
insert into permissions values (2, 'user.create', 'Manutenção Usuário');
insert into permissions values (3, 'company.list', 'Listar Empresa');
insert into permissions values (4, 'company.create', 'Manutenção Empresa');
--
insert into permissions values (5, 'nursery.list', 'Busca no berçario');
insert into permissions values (6, 'nursery.actions', 'Ações no berçario');
insert into permissions values (7, 'plant.list', 'Busca planta');
insert into permissions values (8, 'plant.actions', 'Ações na planta');
insert into permissions values (9, 'statistics.culti', 'Estatística de cultivo');
insert into permissions values (10, 'crop.list', 'Busca Colheita');
insert into permissions values (11, 'crop.actions', 'Ações na Colheita');
insert into permissions values (12, 'parameter.list', 'Listar parâmetros');
insert into permissions values (13, 'parameter.action', 'Ações parâmetros');

insert into roles (name, active) values ('Administrador', true);
insert into roles (name, active) values ('Cultivador', true);

insert into "_PermissionsToRoles" values (1,1);
insert into "_PermissionsToRoles" values (2,1);
insert into "_PermissionsToRoles" values (3,1);
insert into "_PermissionsToRoles" values (4,1);
insert into "_PermissionsToRoles" values (5,1);
insert into "_PermissionsToRoles" values (6,1);
insert into "_PermissionsToRoles" values (7,1);
insert into "_PermissionsToRoles" values (8,1);
insert into "_PermissionsToRoles" values (9,1);
insert into "_PermissionsToRoles" values (10,1);
insert into "_PermissionsToRoles" values (11,1);
insert into "_PermissionsToRoles" values (12,1);
insert into "_PermissionsToRoles" values (13,1);

insert into "_PermissionsToRoles" values (5, 2);
insert into "_PermissionsToRoles" values (6, 2);
insert into "_PermissionsToRoles" values (7, 2);
insert into "_PermissionsToRoles" values (8, 2);



INSERT INTO public.users
(id, "name", email, "password", created_at, id_role)
VALUES(2, 'admin', 'gabrielbroitmanpinheiro@gmail.com', '$2b$10$qfU1RGFXQ9FZOAL.s/rGF.jR3jcL8hYpXPslrRPFMo46KXMjBxKv2', CURRENT_TIMESTAMP, 1);


INSERT INTO public.users
(id, "name", email, "password", created_at, id_role)
VALUES(1, 'admin', 'gabbade@gmail.com', '$2b$10$Lf5D8S6WHQ94YIp9M4WMDeXV9eV3qIH1XSxzcWAE7aHZofbqh2a4S', CURRENT_TIMESTAMP, 1);
