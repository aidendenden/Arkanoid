using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Serialization;

public class Ball : MonoBehaviour
{
    public Rigidbody rb;

    public float force = 35;
    public Transform ball;
    public Transform paddle;
    public Transform direction;
    public Transform needle;
    
    public float RESET_Y ;

    //private float ballspeed;

    private Camera mainCamera; 
    // Start is called before the first frame update
    void Start()
    {
        mainCamera = Camera.main;
        ball = GameObject.FindGameObjectWithTag("Ball").transform;
        paddle = GameObject.FindGameObjectWithTag("Player").transform;
        direction = GameObject.FindGameObjectWithTag("Direction").transform;
        needle = GameObject.FindGameObjectWithTag("Needle").transform;
        RESET_Y = ball.transform.position.y;
        rb = ball.GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        if (BrickManager.Instance.gamePass)
        {
            return;
        }
        if (!BrickManager.Instance.isEmission)
        { 
            direction.gameObject.SetActive(true);
            Vector3 pos = ball.position;
            pos.x = paddle.position.x;
            pos.y = RESET_Y;
            ball.position = pos;
            direction.position = pos;
            
            if (Input.GetKeyDown(KeyCode.Space))
            {
                Vector3 launchDirection = (needle.position -  direction.position).normalized;
                rb.AddForce(launchDirection * force, ForceMode.Impulse);
                //ballspeed=rb.velocity.magnitude;
                direction.gameObject.SetActive(false);
                BrickManager.Instance.isEmission = true;
            }
        }
    }

    private void OnCollisionEnter(Collision other)
    {
        //rb.velocity.magnitude = ballspeed;
        if (other.gameObject.CompareTag("Brick"))
        {
            BrickManager.Instance.CheckBrick();
            Destroy(other.gameObject);
        }
    }

    private void OnCollisionExit(Collision other)
    {
        Vector3 velocity = rb.velocity.normalized;
        rb.velocity = velocity * force;
        //rb.AddForce(velocity*2,ForceMode.VelocityChange);
    }
}