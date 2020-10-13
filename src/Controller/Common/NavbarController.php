<?php

namespace App\Controller\Common;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class NavbarController extends AbstractController
{
    public function navbar() : Response
    {
        return $this->render('common/_navbar.html.twig', []);
    }
}