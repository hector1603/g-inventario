<?php

require_once('includes/load.php');
if (!$session->isUserLoggedIn(true)) { redirect('index.php', false); }




// Auto suggetion
if (isset($_POST['product_name']) && strlen($_POST['product_name'])) {
  $product_name = $_POST['product_name'];
  $products = find_product_by_title($product_name);
  if ($products) {
      $html = '<ul class="list-group">';
      foreach ($products as $product) {
          $html .= '<li class="list-group-item">';
          $html .= 'Nombre: '.$product['name'].' - '.$product['sale_price'].' Bs.';
          $html .= '</li>';
      }
      $html .= '</ul>';
  } else {
      $html = '<ul class="list-group">';
      $html .= '<li class="list-group-item">No encontrado</li>';
      $html .= '</ul>';
  }
  echo json_encode($html);
}



/*
require_once('includes/load.php');
if (!$session->isUserLoggedIn(true)) { redirect('index.php', false); }

// Auto suggetion
if (isset($_POST['product_name']) && strlen($_POST['product_name'])) {
    $html = '';
    $products = find_product_by_title($_POST['product_name']);
    if ($products) {
        foreach ($products as $product) {
            $html .= "<li class=\"list-group-item\">";
            $html .= $product['name'];
            $html .= "</li>";
        }
    } else {
        $html .= '<li onClick="fill(\''.addslashes($_POST['product_name']).'\')" class="list-group-item">';
        $html .= 'No encontrado';
        $html .= "</li>";
    }
    echo json_encode($html);
}
*/
// find all product
if (isset($_POST['p_name']) && strlen($_POST['p_name'])) {
    $product_title = remove_junk($db->escape($_POST['p_name']));
    $html = '';
    if ($results = find_all_product_info_by_title($product_title)) {
        foreach ($results as $result) {
            $html .= "<tr>";
            $html .= "<td id=\"s_name\">".$result['name']."</td>";
            $html .= "<input type=\"hidden\" name=\"s_id\" value=\"{$result['id']}\">";
            $html .= "<td>";
            $html .= "<input type=\"text\" class=\"form-control\" name=\"price\" value=\"{$result['sale_price']}\">";
            $html .= "</td>";
            $html .= "<td id=\"s_qty\">";
            $html .= "<input type=\"text\" class=\"form-control\" name=\"quantity\" value=\"1\">";
            $html .= "</td>";
            $html .= "<td>";
            $html .= "<input type=\"text\" class=\"form-control\" name=\"total\" value=\"{$result['sale_price']}\">";
            $html .= "</td>";
            $html .= "<td>";
            $html .= "<input type=\"date\" class=\"form-control datePicker\" name=\"date\" data-date data-date-format=\"yyyy-mm-dd\">";
            $html .= "</td>";
            $html .= "<td>";
            $html .= "<button type=\"submit\" name=\"add_sale\" class=\"btn btn-primary\">Agregar</button>";
            $html .= "</td>";
            $html .= "</tr>";
        }
    } else {
        $html ='<tr><td>El producto no se encuentra registrado en la base de datos</td></tr>';
    }
    echo json_encode($html);
}
?>
