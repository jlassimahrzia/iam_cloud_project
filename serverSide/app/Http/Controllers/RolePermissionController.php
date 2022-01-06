<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class RolePermissionController extends Controller
{
    public function assign_role_to_user(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required'],
            'role_id' => ['required'],
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $user_id = $request->json()->get('user_id');
        $role_id = $request->json()->get('role_id');

        $role = Role::find($role_id); //obj
        $user = User::where('id', $user_id)->first(); //obj

        if (isset($role)) {
            if (isset($user)) {
                $user->assignRole($role);
            } else return response()->json(['msg' => "User not found"], 200);
        } else return response()->json(['msg' => "Role not found"], 200);

        return response()->json([
            'msg' => 'Role assigned successfully',
            'user' => $user
        ], 200);
    }

    /**
     * Role
     */
    public function create_new_role(Request $request)
    {

        $validator = Validator::make($request->json()->all(), [
            'role_name' => 'required|string|max:255',
            'permissions' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $role_name = $request->get('role_name');
        $InputPermissions = $request->get('permissions');
        // app permissions
        $availablePermissions = Permission::all()->pluck('name')->toArray();

        try {
            // check if permission exists in our application
            $difference = array_diff($InputPermissions, $availablePermissions);
            if (count($difference) == 0) {
                // all permissions are availabale
                $role = Role::create(['name' => $role_name]);
                $role->givePermissionTo($InputPermissions);
                return response()->json([
                    'msg' => 'Role added successfully ',
                    'role' => $role
                ], 200);
            } else {
                return response()->json([
                    "msg" => "Permission is not available",
                ], 400);
            }
        } catch (\Throwable $e) {
            return response()->json([
                "msg" => $e->getMessage(),
            ], 400);
        }
    }

    public function delete_role($id)
    {
        try {
            $role_to_delete = Role::find($id);
            if (isset($role_to_delete)) {
                $role_to_delete->delete();
                return response()->json([
                    "msg" => "Role deleted successfully",
                ], 200);
            } else return response()->json(['msg' => "Role not found"], 200);
        } catch (\Throwable $e) {
            return response()->json([
                "msg" => $e->getMessage(),
            ], 400);
        }
    }

    public function roles_list()
    {
        $roles = Role::with('permissions')->get();
        return $roles;
    }

    /**
     * Permission
     */

    public function create_permission_assign_role_to_permission(Request $request)
    {

        $validator = Validator::make($request->json()->all(), [
            'permission_name' => 'required|string|max:255',
            'role_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $permission_name = $request->get('permission_name');
        $role_id = $request->get('role_id');
        $role = Role::find($role_id);
        if (isset($role)) {
            $permission = Permission::create(['name' => $permission_name]);
            $role->givePermissionTo($permission_name);
            // ou  $permission->assignRole($role);
            return response()->json([
                'msg' => 'Permission added successfully ',
                'permission' => $permission
            ], 200);
        } else return response()->json(['msg' => "Role not found"], 200);
    }

    public function create_permission(Request $request)
    {

        $validator = Validator::make($request->json()->all(), [
            'permission_name' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $permission_name = $request->get('permission_name');
        $permission = Permission::create(['name' => $permission_name]);

        return response()->json([
            'msg' => 'Permission added successfully ',
            'permission' => $permission
        ], 200);
    }

    public function permissions_list()
    {
        $permissions = Permission::with('roles')->get();
        return $permissions;
    }
}
