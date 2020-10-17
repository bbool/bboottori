<?php

namespace App\Model;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserModel {
    public static function save(EntityManagerInterface $em, array $data): ?array
    {
        $error = true;
        $id = 0;
        if (self::checkAjaxData($data)) {
            $user = new User();
            $user->setUsername($data['username'])
            ->setPassword($data['pwd'])
            ->setName($data['name'])
            ->setSurname($data['surname'])
            ->setEmail($data['email']);
            $em->persist($user);
            $em->flush();
            $id = $user->getId();
            $error = false;
        }
        
        return [
            'id' => $id,
            'error' => $error
        ];
    }
    
    public static function checkAjaxData(array $data): ?bool
    {
        if (empty($data) || empty($data['username']) || empty($data['pwd']) || empty($data['name']) || empty($data['surname']) || empty($data['email'])) {
            return false;
        }
        return true;
    }
}