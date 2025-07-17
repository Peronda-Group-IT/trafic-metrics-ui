const PERMISSIONS = {
  admin: [
    "view:actions:all",
    "edit:actions:all",
    "delete:actions:all",
    "create:actions:all",
  ],
  comercial: [
    "view:actions:own",
    "edit:actions:own",
    "delete:actions:own",
    "create:actions:own",
  ],
  manager: [
    "view:actions:all",
    "edit:actions:all",
    "delete:actions:own",
    "create:actions:own",
  ],
};

const VISIBILITIES = {
  admin: ["view:settings:[all]"],
  comercial: ["view:settings:[languaje,calendar]"],
  manager: ["view:settings:[all]"],
};

export const checkPermission = (
  user,
  action,
  resourceType,
  resource = null
) => {
  const permissions = PERMISSIONS[user.role];
  if (!permissions) return false;

  const isOwn = resource?.ownerId === user.id;

  // Check both variants
  const ownPermission = `${action}:${resourceType}:own`;
  const allPermission = `${action}:${resourceType}:all`;

  if (isOwn && permissions.includes(ownPermission)) return true;
  if (permissions.includes(allPermission)) return true;

  return false;
};

export function checkVisibility(role, resource, attribute) {
  const permissions = VISIBILITIES[role];
  if (!permissions) return false;

  for (const permission of permissions) {
    const match = permission.match(/^view:(\w+):\[(.+)\]$/);
    if (!match) continue;

    const [_, permResource, attributesStr] = match;
    if (permResource !== resource) continue;

    const attributes = attributesStr.split(',').map(attr => attr.trim());
    if (attributes.includes('all') || attributes.includes(attribute)) {
      return true;
    }
  }

  return false;
}