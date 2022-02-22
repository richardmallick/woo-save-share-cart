<?php
/**
 * Save cart endpoint class.
 */

namespace Ankit\WCSSC\API\Endpoints;

use Ankit\WCSSC\Interfaces\Endpoint;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

/**
 * Class SaveCart
 *
 * @package Ankit\WCSSC\Endpoint
 */
class CopyLink implements Endpoint {
    /**
     * Return the request method.
     *
     * @return string
     */
    public function method() {

        return WP_REST_Server::CREATABLE;
    }

    /**
     *
     * @param  WP_REST_Request $request
     * @return string|void
     */
    public function callback(WP_REST_Request $request) {
        $email_address = sanitize_text_field($_POST['emailTo']);
        $link = esc_url_raw($_POST['link']);

        $cartID = basename($link);

        $args = [
            'post_type'   => 'wcssc-cart',
            'post_status' => 'any',
            'meta_value'  => $cartID,
            'meta_query'  => [
                [
                    'key'     => 'wcssc_cart_hash',
                    'value'   => $cartID,
                    'compare' => 'LIKE'
                ]
            ]
        ];

        $posts = get_posts($args);

        $postUpdated = true;

        if ($posts) {
            foreach ($posts as $key => $post) {
                $isUpdated = update_post_meta($post->ID, 'copy_link_owner', $email_address);

                $postUpdated = !is_wp_error($isUpdated) ? true : false;
            }
        }

        if ($postUpdated) {
            return new WP_REST_Response(
                [
                    'success' => true,
                    'message' => __('Link copied successfully', 'wcssc')
                ]
            );
        }

        return new WP_REST_Response(
            [
                'success' => false,
                'message' => __('Error: Email cannot be sent at this moment.', 'wcssc')
            ]
        );

    }

    /**
     * Endpoint name.
     */
    public function endpoint() {

        return 'copy-link';
    }

    /**
     * Visitors can email the cart even if they are not logged in.
     *
     * @return bool|mixed
     */
    public function permission_callback() {

        return true;
    }
}