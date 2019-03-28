<?php
    include_once $_SERVER["DOCUMENT_ROOT"]."/main.php";
    date_default_timezone_set("America/Argentina/Cordoba");
    header('Content-Type: text/html; charset=utf-8');

    //inicio importacion de librerias
    include_once $_SERVER["DOCUMENT_ROOT"]."/lib/tcpdf/tcpdf.php";

    $Fecha = new DateTime();

    $style3 = array('width' => 0.3, 'cap' => 'round', 'join' => 'round', 'solid' => '1', 'color' => array(0, 0, 0));
    $pdf = new TCPDF("P", "mm", "A4", true, 'UTF-8', false);
    $pdf->SetCreator("Cloure");
    $pdf->SetAuthor(''); //Tiene que ir el nombre de la empresa
    $pdf->SetTitle(''); //El titulo del documento
    $pdf->SetSubject('');
    $pdf->SetKeywords('');
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    $pdf->SetDefaultMonospacedFont("Courier");
    $pdf->SetMargins(15, 20, 15);
    $pdf->SetAutoPageBreak(TRUE, 25);
    $pdf->setImageScale(1.00);
    $pdf->setFontSubsetting(true);
    $pdf->SetFont('dejavusans', '', 8, '', true);

    $params=[
        "module"=>"properties", 
        "topic"=>"listar"
    ];
    $propiedades = json_decode($CloureSDK->execute($params));
    $propiedades = $propiedades->Response;

    $pdf->AddPage();

    /*
    $logo=$_SERVER["DOCUMENT_ROOT"].'/images/logo-pdf.png';
    if(file_exists($logo)){
        $pdf->Image($_SERVER["DOCUMENT_ROOT"].'/images/logo-pdf.png', 15, 15, 50, 0, 'PNG', '', '', true, 150, '', false, false, 0, false, false, false);
    }
    */
    $pdf->SetFont('dejavusans', '', 10, '', true);

    $pdf->Ln(6);
    $pdf->SetFont('dejavusans', '', 12, '', true);
    $pdf->Cell(180, 6, "Listado de propiedades al ".date("d/m/Y"), 0, 0, 'C');
    $pdf->SetFont('dejavusans', '', 8, '', true);
    $pdf->Ln(8);

    $pdf->Cell(140, 6, "Nombre", 0, 0, 'L');
    $pdf->Cell(30, 6, "Operacion", 0, 0, 'L');
    $pdf->Ln(5);

    foreach ($propiedades->Registros as $key => $propiedad) { 
        $pdf->Cell(140, 6, $propiedad->Titulo, 0, 0, 'L');
        $pdf->Cell(30, 6, $propiedad->Operacion, 0, 0, 'L');
        $pdf->Ln(5);
    }

    $pdf->Output('expensas_all.pdf', 'I');
?>