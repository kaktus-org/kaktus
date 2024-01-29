INSERT INTO roles (name) VALUES ('admin'), ('user')
ON CONFLICT (name) DO NOTHING;  -- This prevents insertion if 'admin' already exists

INSERT INTO user_roles (user_id, role_id)
VALUES (
    (SELECT id FROM users WHERE email = 'admin@admin'),
    (SELECT id FROM roles WHERE name = 'admin')
);
