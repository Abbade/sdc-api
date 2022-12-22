insert into company values (1, 'Minha Empresa', 'empresa@org.com');

insert into permissions values (1, 'user.list', 'Listar Usuário');
insert into permissions values (2, 'user.create', 'Manutenção Usuário');
insert into permissions values (3, 'company.list', 'Listar Empresa');
insert into permissions values (4, 'company.create', 'Manutenção Empresa');

insert into roles (name, active) values ('Administrador', true);
insert into roles (name, active) values ('Cultivador', true);

insert into "_PermissionsToRoles" values (1,1);
insert into "_PermissionsToRoles" values (2,1);

INSERT INTO public.users
("name", email, "password", created_at, id_role)
VALUES('admin', 'gabrielbroitmanpinheiro@gmail.com', '$2b$10$qfU1RGFXQ9FZOAL.s/rGF.jR3jcL8hYpXPslrRPFMo46KXMjBxKv2', CURRENT_TIMESTAMP, 1);


select * from tb_contrato where numero_contrato in (
'123456789',
'5200001184',
'5200001187',
'5200001253',
'5200001259',
'5200001262',
'5200001273',
'5200001405',
'5200001498',
'52L0001871',
'52L0001940',
'52L0001941',
'52L0001946',
'52L0001963');

