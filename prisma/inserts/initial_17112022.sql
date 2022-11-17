insert into company values (1, 'Minha Empresa', 'empresa@org.com');

insert into permissions values (1, 'user.list', 'Listar Usuário');
insert into permissions values (2, 'user.create', 'Manutenção Usuário');
insert into permissions values (3, 'company.list', 'Listar Empresa');
insert into permissions values (4, 'company.create', 'Manutenção Empresa');

insert into roles (name, active) values ('Administrador', true);
insert into roles (name, active) values ('Cultivador', true);

insert into "_PermissionsToRoles" values (1,1);
insert into "_PermissionsToRoles" values (2,1);

