using System.Collections;
using System.Collections.Generic;
using System.Xml.Schema;
using Unity.Collections;
using UnityEngine;

public class PlayerMover : MonoBehaviour
{
    public float xMin;
    public float xMax;
    public float speed = 5;
    
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (BrickManager.Instance.gamePass)
        {
            return;
        }
        var value=Input.GetAxisRaw("Horizontal");
        if (value!=0)
        {
            Vector3 pos = transform.position;
            pos.x += value * Time.deltaTime * speed;
            pos.x = Mathf.Clamp(pos.x, xMin, xMax);
            transform.position = pos;
        }
    }
}
