<?php

namespace App\Controller\Ajax;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Model\UserModel;

class UserAJAXController extends AbstractController
{
    /**
     * @Route("/ajax/register", name="ajaxRegister")
     */
    public function register(EntityManagerInterface $em, Request $request)
    {
        return new JsonResponse(UserModel::save($em, $request->request->all()));
    }
}